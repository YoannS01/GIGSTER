import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  updateId,
  updateEmail,
  updateUsername,
  updateToken,
  updateArtist,
  updateHost,
  updateBirthdate,
  updateFirstname,
  updateLastname,
  updateAddress,
  updatePhoneNumber,
  getArtistInfos,
  getHostInfos,
} from "../reducers/user";
import { Formik } from "formik";
import * as Yup from "yup";
import { FRONT_IP } from "../hide-ip";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";

const imageSign = { uri: 'https://www.transparenttextures.com/patterns/cartographer.png' };





// Définir les schémas de validation avec Yup

// SignIn Schema
const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// SignUp Schema
const signUpSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function Login(props, navigate) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [isSignIn, setIsSignIn] = useState(false);

  const handleSubmitSignIn = (values, { setSubmitting, setErrors }) => {
    fetch(`http://${FRONT_IP}:3000/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("REPONSE DU BACK", data);
        setSubmitting(false);
        if (!data.result) {
          setErrors({ general: data.error });
        } else {
          delete data.data.artist._id;
          dispatch(updateId(data.data._id));
          dispatch(updateToken(data.data.token));
          dispatch(updateUsername(data.data.username));
          dispatch(updateEmail(data.email));
          dispatch(updateFirstname(data.data.firstname));
          dispatch(updateLastname(data.data.lastname));
          dispatch(updateAddress(data.data.address));
          dispatch(updatePhoneNumber(data.data.phoneNumber));
          dispatch(getArtistInfos(data.data.artist));
          dispatch(getHostInfos(data.data.host));
          dispatch(
            updateBirthdate(moment(data.data.birthdate).format("DD/MM/YYYY"))
          );
          dispatch(updateArtist(data.data.isArtist));
          dispatch(updateHost(data.data.isHost));
          console.log(data);

          navigation.navigate("TabNavigator", { screen: "Home" });
        }
      });
  };

  const handleSubmitSignUp = (values, { setSubmitting, setErrors }) => {
    if (values.password !== values.confirmPassword) {
      setErrors({ confirmPassword: "Passwords must match" });
      setSubmitting(false);
    } else {
      props.updateUser({
        username: values.username,
        email: values.email,
        password: values.password,
      });
      props.getNextPage(2);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.KeyboardAvoidingViewContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <LinearGradient
          colors={['#6600ff', '#f4fcfe']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1.6, y: 0.7 }}
          style={styles.gradient}
        >
          <ImageBackground source={imageSign} style={styles.backgroundImage}>
            {!isSignIn ? (
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={signInSchema}
                onSubmit={handleSubmitSignIn}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  isSubmitting,
                }) => (
                  <View style={styles.signInContainer}>
                    <Text style={styles.signin}>Sign In</Text>
                    <Text style={styles.titles}>Email</Text>
                    <TextInput
                      placeholder="name@example.com"
                      style={styles.input}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.error}>{errors.email}</Text>
                    )}
                    <Text style={styles.titles}>Password</Text>
                    <TextInput
                      secureTextEntry
                      placeholder="Insert your password"
                      style={styles.input}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                    />
                    {touched.password && errors.password && (
                      <Text style={styles.error}>{errors.password}</Text>
                    )}
                    {errors.general && (
                      <Text style={styles.error}>{errors.general}</Text>
                    )}
                    <TouchableOpacity
                      style={styles.input_signin_button}
                      onPress={handleSubmit}
                      disabled={isSubmitting}
                    >
                      <Text style={styles.text_signin}>Sign in</Text>
                    </TouchableOpacity>
                    <Text>or use one of your social profiles</Text>
                    <View style={styles.bottom}>
                      <Text style={styles.bottom_text}>Pas encore inscrit ?</Text>
                      <Text onPress={() => setIsSignIn(true)} style={styles.bottom_signup}>Sign Up</Text>
                    </View>
                  </View>
                )}
              </Formik>
            ) : (
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={signUpSchema}
                onSubmit={handleSubmitSignUp}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  isSubmitting,
                }) => (
                  <View style={styles.signInContainer}>
                    <Text style={styles.signin}>Sign Up</Text>
                    <Text style={styles.titles}>Username</Text>
                    <TextInput
                      placeholder="Username"
                      style={styles.input}
                      onChangeText={handleChange("username")}
                      onBlur={handleBlur("username")}
                      value={values.username}
                    />
                    {touched.username && errors.username && (
                      <Text style={styles.error}>{errors.username}</Text>
                    )}
                    <Text style={styles.titles}>Email</Text>
                    <TextInput
                      placeholder="name@example.com"
                      style={styles.input}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.error}>{errors.email}</Text>
                    )}
                    <Text style={styles.titles}>Password</Text>
                    <TextInput
                      secureTextEntry
                      placeholder="Insert your password"
                      style={styles.input}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                    />
                    {touched.password && errors.password && (
                      <Text style={styles.error}>{errors.password}</Text>
                    )}
                    <Text style={styles.titles}>Confirm your Password</Text>
                    <TextInput
                      secureTextEntry
                      placeholder="Confirm your password"
                      style={styles.input}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      value={values.confirmPassword}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Text style={styles.error}>{errors.confirmPassword}</Text>
                    )}
                    {errors.general && (
                      <Text style={styles.error}>{errors.general}</Text>
                    )}
                    <TouchableOpacity
                      style={styles.input_signup_button}
                      onPress={handleSubmit}
                      disabled={isSubmitting}
                    >
                      <Text style={styles.text_signup}>Sign Up</Text>
                    </TouchableOpacity>
                    <View style={styles.bottomSignup}>
                      <Text style={styles.bottom_text}>Déjà inscrit ?</Text>
                      <Text
                        style={styles.bottom_signup}
                        onPress={() => setIsSignIn(false)}
                      >
                        Sign In
                      </Text>
                    </View>
                  </View>
                )}
              </Formik>
            )}
          </ImageBackground>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  KeyboardAvoidingViewContainer: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    paddingTop: 33,
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  gradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,

    width: "100%",
    paddingTop: 33,
  },
  signInContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  signup: {
    fontWeight: "bold",
    fontSize: 50,
    marginTop: 10,
  },
  signin: {
    fontWeight: "bold",
    fontSize: 50,
    marginTop: 10,
    color: "#f4fcfe",
    textShadowColors: 'black',
    textShadowOffset: { width: 3, height: 5 },
    textShadowRadius: 4,
    // Effet d'ombre pour les appareils Android
    elevation: 4,
  },
  titles: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 15,
    color: '#f4fcfe',
    textShadowColors: 'black',
    textShadowOffset: { width: 3, height: 5 },
    textShadowRadius: 4,
    // Effet d'ombre pour les appareils Android
    elevation: 4,
  },
  input: {
    height: 50,
    width: '75%',
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
  },
  input_username: {
    height: 40,
    width: '75%',
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginTop: 5,
  },
  input_email: {
    height: 40,
    width: '75%',
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginTop: 5,
  },
  input_password: {
    height: 40,
    width: '75%',
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginTop: 5,
  },
  text_signin: {
    backgroundColor: "#5100FF",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    paddingBottom: 8,
    paddingTop: 8,
    height: "100%",
    width: '100%',
    textAlign: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  text_signup: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  input_signin_button: {
    height: 50,
    width: '75%',
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  input_signup_button: {
    height: 50,
    width: '75%',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderRadius: 13,

    backgroundColor: "#5100FF",
  },
  bottom: {
    alignItems: "space-between",
    paddingTop: 100,
    flexDirection: 'row',
  },
  bottom_text: {
    marginRight: '20%',
    width: '40%',
    fontWeight: 'bold',
    fontSize: 15
  },
  bottom_btn: {
    backgroundColor: '#ec2761',
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    padding: 5,
    borderRadius: 5

  },
  bottom_signup: {
    color: "#5100FF",
    fontWeight: "bold",
    fontSize: 15
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  bottomSignup: {
    flexDirection: 'row'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: '100%',
    height: '100%',
    opacity: 1,
  },
});