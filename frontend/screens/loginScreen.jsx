import Login from "../components/Login";
import Step1 from "../components/Step1"
import Step2 from "../components/Step2"
import React, { useState } from "react";
import { FRONT_IP } from "../hide-ip";
import StatusScreen from "./StatusScreen";
import { updateToken } from "../reducers/user";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [user, setUser] = useState({
    username: null,
    email: null,
    password: null,
    firstname: null,
    lastname: null,
    address: {
      street: null,
      city: null,
      zipcode: null,
    },
    phoneNumber: null,
    birthdate: new Date(),
    artist: {
      artistname: null,
      members: 0,
      placeOrigin: null,
      genres: [],
    },
    host: {
      description: null,
      favoritesGenres: [],
    },
    isArtist: false,
    isHost: false,
    medias: [],
    token: null
  })

  function getNextPage(numPage) {
    setCurrentPage(numPage)
  }

  function updateUser(data) {
    console.log("datas à mettre à jour : ", data)
    setUser((previousUser) => {
      const updatedUser = { ...previousUser };

      Object.keys(data).forEach((key) => {
        if (key === "birthdate") {
          updatedUser[key] = new Date(data[key]);
          return;
        }
        updatedUser[key] = data[key];

      });

      if (currentPage !== 4) {
        setCurrentPage(currentPage + 1)
      }
      return updatedUser;
    });

  }

  async function sendData() {
    const navigation = useNavigation()
    console.log("Utilisateur final : ", user)
    console.log("Date relevée : ", user.birthdate)
    console.log("Envoi des données vers le backend")
    const resp = await fetch(`http://${FRONT_IP}:3000/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })

    const data = await resp.json()

    console.log("Retour du backend : ", data.result, data.token)
    if (data.result) {
      dispatch(updateToken(data.token))
      console.log('hello')
      navigation.navigate("TabNavigator", { screen: "Home" });
    }
  }


  return (
    <>
      {currentPage === 1 && <Login getNextPage={getNextPage} updateUser={updateUser} user={user} />}
      {currentPage === 2 && <StatusScreen getNextPage={getNextPage} updateUser={updateUser} user={user} />}
      {currentPage === 3 && <Step1 getNextPage={getNextPage} updateUser={updateUser} user={user} />}
      {currentPage === 4 && <Step2 getNextPage={getNextPage} updateUser={updateUser} sendData={sendData} user={user} />}
    </>

  )
}