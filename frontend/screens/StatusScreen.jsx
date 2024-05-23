import { FRONT_IP } from "../hide-ip";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProgressStepsComponent from "../components/ProgessStepsComponent";



export default function StatusScreen() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.value)

    //variable d'états :
    const [isArtist, setIsArtist] = useState(false)
    const [isHost, setIsHost] = useState(false)

    function handleArtist() {
        setIsArtist(true)
    }


    function handleHost() {
        setIsHost(true)
    }

    if (!isArtist || !isHost) {
        return (
            <View>
                <View style={styles.mainSelect}>
                    <Text>Quel profil es tu ?</Text>
                    <TouchableOpacity style={styles.artistBtn} onPress={() => handleArtist()}>
                        <Text style={styles.text} >Artiste</Text>
                    </TouchableOpacity>
                    <TouchableOpacity tyle={styles.hostBtn} onPress={() => handleHost()}>
                        <Text style={styles.text}>Hôte</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    if (isArtist) {
        return (
            <View>
                <ProgressStepsComponent />
            </View>

        )
    }




}

const styles = StyleSheet.create({
    mainSelect: {
        width: '100%',
        height: '100%',
        backgroundColor: '#e1f5ff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {
        color: 'black'
    }


});