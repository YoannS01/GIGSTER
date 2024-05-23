import { FRONT_IP } from "../hide-ip";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateEmail,
  updateUsername,
  updateToken,
  updateArtist,
  updateHost,
} from "../reducers/user";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

export default function LoginScreen({ navigation }) {
  //Variables d'états
  const dispatch = useDispatch();
  const [emailSignIn, setEmailSignIn] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [confirmPasswordSignUp, setConfirmPasswordSignUp] = useState("");
  const [username, setUsername] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const [Error, setError] = useState(false);
  const [messageError, setMessageError] = useState("");

  // Au press du boutton signUp
  const handleSubmitSignUp = () => {
    //Vérification de la validité de l'email lors du Sign Up
    if (EMAIL_REGEX.test(emailSignUp)) {
      fetch(`http://${FRONT_IP}:3000/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailSignUp,
          password: passwordSignUp,
          verifiedPassword: confirmPasswordSignUp,
          username: username,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.result) {
            setError(true);
            setEmailSignUp("");
            setPasswordSignUp("");
            setConfirmPasswordSignUp("");
            setUsername("");
            setMessageError(data.error);
          } else {
            dispatch(updateUsername(username));
            dispatch(updateEmail(emailSignUp));
            dispatch(updateToken(data.token));
            dispatch(updateArtist(data.isArtist));
            dispatch(updateHost(data.isHost));
            return navigation.navigate("TabNavigator", { screen: "Home" });
          }
        });
    } else {
      setEmailSignUp("");
      setPasswordSignUp("");
      setConfirmPasswordSignUp("");
      setUsername("");
      setError(true);
      setMessageError("Invalid email adress");
    }
  };

  // Au press du boutton signIn
  const handleSubmitSignIn = () => {
    //Vérification de la validité de l'email lors du Sign In
    if (EMAIL_REGEX.test(emailSignIn)) {
      fetch(`http://${FRONT_IP}:3000/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailSignIn,
          password: passwordSignIn,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (!data.result) {
            setError(true);
            setEmailSignIn("");
            setPasswordSignIn("");
            setMessageError(data.error);
          } else {
            dispatch(updateUsername(data.data.username));
            dispatch(updateEmail(data.data.email));
            dispatch(updateToken(data.data.token));
            dispatch(updateArtist(data.data.isArtist));
            dispatch(updateHost(data.data.isHost));
            return navigation.navigate("TabNavigator", { screen: "Home" });
          }
        });
    } else {
      setEmailSignIn("");
      setPasswordSignIn("");
      setError(true);
      setMessageError("Invalid email adress");
    }
  };

  return !isSignIn ? (
    // SIGN IN SCREEN :
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.signin}>Sign In</Text>
        <Text style={styles.titles}>Email</Text>
        <TextInput
          placeholder="name@example.com"
          style={styles.input_email}
          onChangeText={(value) => setEmailSignIn(value)}
          value={emailSignIn}
        />
        <Text style={styles.titles}>Password</Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Insert your password"
          style={styles.input_password}
          onChangeText={(value) => setPasswordSignIn(value)}
          value={passwordSignIn}
        />
        {Error && <Text style={styles.error}>{messageError}</Text>}
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
      </ScrollView>
    </KeyboardAvoidingView>
  ) : (
    // SIGN UP SCREEN :
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.signup}>Sign Up</Text>
        <Text style={styles.titles}>Username</Text>
        <TextInput
          placeholder="Username"
          style={styles.input_username}
          onChangeText={(value) => setUsername(value)}
          value={username}
        />
        <Text style={styles.titles}>Email</Text>
        <TextInput
          placeholder="name@example.com"
          style={styles.input_email}
          onChangeText={(value) => setEmailSignUp(value)}
          value={emailSignUp}
        />
        <Text style={styles.titles}>Password</Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Insert your password"
          style={styles.input_password}
          onChangeText={(value) => setPasswordSignUp(value)}
          value={passwordSignUp}
        />
        <Text style={styles.titles}>Confirm your Password</Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Confirm your password"
          style={styles.input_password}
          onChangeText={(value) => setConfirmPasswordSignUp(value)}
          value={confirmPasswordSignUp}
        />
        {Error && <Text style={styles.error}>{messageError}</Text>}
        <TouchableOpacity style={styles.input_signup_button}>
          <Text style={styles.text_signup} onPress={() => handleSubmitSignUp()}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <View style={styles.bottom}>
          <Text style={styles.bottom_text}>Déjà inscrit ?</Text>
          <Text style={styles.bottom_signup} onPress={() => setIsSignIn(false)}>
            Sign In
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1f5ff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContainer: {
    flexGrow: 1,
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
  signup: {
    fontWeight: "bold",
    fontSize: 50,
    marginTop: 10,
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
  input_username: {
    height: 40,
    width: 300,
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginTop: 5,
  },
  input_email: {
    height: 40,
    width: 300,
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginTop: 5,
  },
  input_password: {
    height: 40,
    width: 300,
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
  text_signup: {
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
    height: 50,
    width: 350,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  input_signup_button: {
    height: 50,
    width: 350,
    alignItems: "center",
    justifyContent: "center",
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
