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
} from "react-native";
import { useDispatch } from "react-redux";
import {
    updateEmail,
    updateUsername,
    updateToken,
    updateArtist,
    updateHost,
} from "../reducers/user";
import { Formik } from "formik";
import * as Yup from "yup";
import { FRONT_IP } from "../hide-ip";
import { useNavigation } from "@react-navigation/native";

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

export default function Login(props) {
    const navigation = useNavigation()
    const dispatch = useDispatch();
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
                console.log("REPONSE DU BACK", data.result)
                setSubmitting(false);
                if (!data.result) {
                    setErrors({ general: data.error });
                } else {
                    //navigation est undefined
                    navigation.navigate("TabNavigator", { screen: "Home" });
                    /* dispatch(updateUsername(data.data.username));
                     dispatch(updateEmail(data.data.email));
                     dispatch(updateToken(data.data.token));
                     dispatch(updateArtist(data.data.isArtist));
                     dispatch(updateHost(data.data.isHost));
 */
                }
            })

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
            })
            props.getNextPage(2)
        }
    };



    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
                            <View>
                                <Text style={styles.signin}>Sign In</Text>
                                <Text style={styles.titles}>Email</Text>
                                <TextInput
                                    placeholder="name@example.com"
                                    style={styles.input_email}
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
                                    style={styles.input_password}
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
                                    <Text style={styles.text_signin}>Sign In</Text>
                                </TouchableOpacity>
                                <Text>or use one of your social profiles</Text>
                                <View style={styles.bottom}>
                                    <Text style={styles.bottom_text}>Pas encore inscrit ?</Text>
                                    <Text
                                        style={styles.bottom_signup}
                                        onPress={() => setIsSignIn(true)}
                                    >
                                        Sign Up
                                    </Text>
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
                            <View>
                                <Text style={styles.signup}>Sign Up</Text>
                                <Text style={styles.titles}>Username</Text>
                                <TextInput
                                    placeholder="Username"
                                    style={styles.input_username}
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
                                    style={styles.input_email}
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
                                    style={styles.input_password}
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
                                    style={styles.input_password}
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
                                <View style={styles.bottom}>
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
    error: {
        color: "red",
        marginTop: 10,
    },
});