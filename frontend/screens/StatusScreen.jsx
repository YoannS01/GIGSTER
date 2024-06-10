import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";

import ProgressStepsComponent from "../components/ProgessStepsComponent";



export default function StatusScreen(props) {



    function handleArtist() {
        const newStatus = {
            isArtist: true,
            isHost: false,
        }
        props.updateUser(newStatus)
    }

    function handleHost() {
        const newStatus = {
            isArtist: false,
            isHost: true,
        }
        props.updateUser(newStatus)
    }


    return (
        <View>
            <View style={styles.mainSelect}>
                <Text style={styles.title}>Quel profil es tu ?</Text >
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
        color: 'white',
        fontSize: '20px'
    },
    title: {
        fontSize: '25px',
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
        marginTop: 5,
        width: '50%',
        height: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    }
});

console.log('debug')