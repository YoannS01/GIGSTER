import { FRONT_IP } from "../hide-ip";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

console.log(FRONT_IP);

export default function LoginScreen({ navigation }) {
  //Variables d'états
  const [emailSignIn, setEmailSignIn] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [confirmPasswordSignUp, setConfirmPasswordSignUp] = useState("");
  const [username, setUsername] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleSubmitSignUp = () => {
    if (EMAIL_REGEX.test(emailSignUp)) {
      fetch(`http://${frontIp}:3000/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailSignUp,
          password: passwordSignUp,
          username: username,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          navigation.navigate("TabNavigator", { screen: "Home" });
        });
    } else {
      setEmailSignUp("");
      setEmailError(true);
    }
  };

  const handleSubmitSignIn = () => {
    //Vérification de la validité de l'email lors du Sign In
    if (EMAIL_REGEX.test(email)) {
      fetch(`http://${frontIp}:3000/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          navigation.navigate("TabNavigator", { screen: "Home" });
        });
    } else {
      setEmailSignIn("");
      setEmailError(true);
    }
  };

  return !isSignIn ? (
    //SIGN IN SCREEN :
    <View style={styles.container}>
      <Text style={styles.signin}>Sign In</Text>
      <Text style={styles.titles}>Email</Text>
      <TextInput
        placeholder="name@example.com"
        style={styles.input_email}
        onChangeText={(value) => setEmailSignIn(value)}
        value={emailSignIn}
      ></TextInput>
      {emailError && <Text style={styles.error}>Invalid email address</Text>}
      <Text style={styles.titles}>Password</Text>
      <TextInput
        placeholder="Insert your password"
        style={styles.input_password}
        onChangeText={(value) => setPasswordSignIn(value)}
        value={passwordSignIn}
      ></TextInput>
      <TouchableOpacity style={styles.input_signin_button}>
        <Text style={styles.text_signin} onPress={() => handleSubmitSignIn()}>
          Sign In
        </Text>
      </TouchableOpacity>

      <Text>or use one of your social profiles</Text>
      <View style={styles.bottom}>
        <Text style={styles.bottom_text}>Pas encore inscrit ?</Text>
        <Text style={styles.bottom_signup} onPress={() => setIsSignIn(true)}>
          Sign Up
        </Text>
      </View>
    </View>
  ) : (
    //SIGN UP SCREEN :
    <View style={styles.container}>
      <Text style={styles.signup}>Sign Up</Text>
      <Text style={styles.titles}>Username</Text>
      <TextInput
        placeholder="Username"
        style={styles.input_username}
        onChangeText={(value) => setUsername(value)}
        value={username}
      ></TextInput>
      <Text style={styles.titles}>Email</Text>
      <TextInput
        placeholder="name@example.com"
        style={styles.input_email}
        onChangeText={(value) => setEmailSignUp(value)}
        value={emailSignUp}
      ></TextInput>
      {emailError && <Text style={styles.error}>Invalid email address</Text>}
      <Text style={styles.titles}>Password</Text>
      <TextInput
        placeholder="Insert your password"
        style={styles.input_password}
        onChangeText={(value) => setPasswordSignUp(value)}
        value={passwordSignUp}
      ></TextInput>
      <Text style={styles.titles}>Confirm your Password</Text>
      <TextInput
        placeholder="Confirm your password"
        style={styles.input_password}
        onChangeText={(value) => setConfirmPasswordSignUp(value)}
        value={confirmPasswordSignUp}
      ></TextInput>
      <TouchableOpacity style={styles.input_signup_button}>
        <Text style={styles.text_signup} onPress={() => handleSubmitSignUp()}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1f5ff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginTop: 50,
    marginBottom: 50,
    height: "22%",
    width: "50%",
    borderRadius: 100,
  },
  signin: {
    fontWeight: "bold",
    fontSize: 50,
    marginTop: 10,
  },
  titles: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 15,
  },
  input_email: {
    height: "5%",
    width: "80%",
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginTop: 5,
  },
  input_password: {
    height: "5%",
    width: "80%",
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginTop: 5,
  },
  text_signin: {
    backgroundColor: "#ec2761",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 130,
    paddingRight: 130,
    height: "100%",
  },
  input_signin_button: {
    height: "6%",
    width: "100%",
    alignItems: "center",
    paddingTop: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  bottom: {
    alignItems: "space-between",
    paddingTop: 100,
  },
  bottom_text: {
    marginRight: 200,
  },
  bottom_signup: {
    color: "#ec2761",
    fontWeight: "bold",
  },
});
