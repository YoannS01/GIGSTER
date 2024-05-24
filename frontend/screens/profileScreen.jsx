import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';

import { useDispatch } from 'react-redux';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function ProfileScreen() {

    const [image, setImage] = useState(null);

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.profileCard}>
                    <View style={styles.PPContainer}>
                        <Image style={styles.profilePic} source={require('../assets/Shulk.png')} />
                    </View>
                    <View style={styles.profileDesc}>
                        <Text style={styles.username}>JustneedVic</Text>
                        <View style={styles.infosContainer}>
                            <Text style={styles.type}>Artiste</Text>
                            <Text>Versailles</Text>
                        </View>
                        <View style={styles.infosContainer}>
                            <Text style={styles.instruments}>Instruments : </Text>
                            <Text style={styles.type}>Piano - Ampli - Batterie </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.galleryZone}>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0E7F6',
        height: '100%',
    },
    profileContainer: {
        width: '100%',
        height: '60%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    profileCard: {
        width: '85%',
        height: '80%',
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    PPContainer: {
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profilePic: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: 'black',
        position: 'relative',
        top: '12%'
    },
    profileDesc: {
        width: '100%',
        height: '60%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    username: {
        fontWeight: 'bold',
        fontSize: 25
    },
    infosContainer: {
        alignItems: 'center'
    },
    instruments: {
        fontStyle: 'italic',
        fontSize: 15
    },
    type: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 17
    },
    galleryZone: {
        height: '40%',
        backgroundColor: 'grey'
    }
});