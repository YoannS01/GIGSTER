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

export default function LoginScreen({ navigation }) {
  //Vérification de la validité de l'email lors du Sign In
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  //Ci-dessous, le "screen: Home" est à créer/modifier
  const handleSubmit = () => {
    if (EMAIL_REGEX.test(email)) {
      navigation.navigate("TabNavigator", { screen: "Home" });
    } else {
      setEmailError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.signin}>Sign In</Text>
      <Text style={styles.titles}>Email</Text>
      <TextInput
        placeholder="name@example.com"
        style={styles.input_email}
        onChangeText={(value) => setEmail(value)}
        value={email}
      >
        {emailError && <Text style={styles.error}>Invalid email address</Text>}
      </TextInput>
      <Text style={styles.titles}>Password</Text>
      <TextInput
        placeholder="Insert your password"
        style={styles.input_password}
      ></TextInput>
      <TouchableOpacity style={styles.input_signin_button}>
        <Text style={styles.text_signin} onPress={() => handleSubmit()}>
          Sign In
        </Text>
      </TouchableOpacity>

      <Text>or use one of your social profiles</Text>
      <View style={styles.bottom}>
        <Text style={styles.bottom_text}>Pas encore inscrit ?</Text>
        <Text style={styles.bottom_signup}>Sign Up</Text>
      </View>
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
    fontWeight: 700,
    fontSize: 50,
    marginTop: 10,
  },
  titles: {
    fontWeight: "600",
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
    fontWeight: "600",
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
    fontWeight: "800",
  },
});
