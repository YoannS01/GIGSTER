<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { TouchableOpacity, View, Text } from "react-native";
=======
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
>>>>>>> 4cfa60bd5bec8253255699ee5e02c29cbafa0a12
=======
import { FRONT_IP } from "../hide-ip";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { useState } from "react";
=======
>>>>>>> e469b3c34aab327bcd184d2cfedda5066bda04c1
import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProgressStepsComponent from "../components/ProgessStepsComponent";
import { updateArtist, updateHost } from "../reducers/user";

>>>>>>> 2834aa6aa8ef308508a9bbe9e4f4fbdd789f9f61

export default function StatusScreen() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.value)

    function handleArtist() {
        dispatch(updateArtist(true))
        dispatch(updateHost(false))
    }

    function handleHost() {
        dispatch(updateHost(true))
        dispatch(updateArtist(false))
    }

    if (!user.isArtist && !user.isHost) {
        return (
            <View>
                <View style={styles.mainSelect}>
                    <Text>Quel profil es tu ?</Text>
                    <TouchableOpacity style={styles.statusBtn} onPress={() => handleArtist()}>
                        <Text style={styles.text} >Artiste</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.statusBtn} onPress={() => handleHost()}>
                        <Text style={styles.text}>Hôte</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View>
            <ProgressStepsComponent isArtist={user.isArtist} isHost={user.isHost} />
        </View>
    )

}

const styles = StyleSheet.create({
    mainSelect: {
        width: '100%',
        height: '100%',
        backgroundColor: '#e1f5ff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        display: 'flex',
    },
    text: {
        color: 'black'
    },
    statusBtn: {
        backgroundColor: '#5100FF',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        marginTop: 5

    }
<<<<<<< HEAD


<<<<<<< HEAD

    return(
<<<<<<< HEAD
        <View style = { styles.container } >
            <Text style={styles.title}>Je suis un..</Text>
            <TouchableOpacity style={styles.input_button}>
                <Text style={styles.text_button}>Artiste</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.input_button}>
                <Text style={styles.text_button}>Hôte</Text>
=======
        <View>
                    <Text>Quel profil es tu ?</Text>
                    <TouchableOpacity onPress={() => handleArtist()}>
                        <Text>Artiste</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleHost()}>
                        <Text>Hôte</Text>
>>>>>>> 4cfa60bd5bec8253255699ee5e02c29cbafa0a12
                    </TouchableOpacity>
                </View>
                )
}


                const styles = StyleSheet.create({
                    container: {
                    flex: 1,
                backgroundColor: "#e1f5ff",
                alignItems: "center",
                justifyContent: "center",
    },
                title: {
                    fontWeight: "bold",
                fontSize: 20,
                marginTop: 15,
    },
                input_button: {
                    height: "6%",
                width: "100%",
                alignItems: "center",
                paddingTop: 10,
                marginTop: 20,
                marginBottom: 10,
    },
                text_button: {
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

})
=======
});
>>>>>>> 2834aa6aa8ef308508a9bbe9e4f4fbdd789f9f61

=======
});
>>>>>>> e469b3c34aab327bcd184d2cfedda5066bda04c1
