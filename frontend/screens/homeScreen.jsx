import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Pressable, Image } from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function App() {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Modal style={styles.modal}
                isVisible={modalVisible}
                swipeDirection="left"
                animationInTiming={500}
                animationIn="slideInLeft"
                animationOut="slideOutLeft"
                hideModalContentWhileAnimating={true}
                backdropTransitionInTiming={500}
                backdropTransitionOutTiming={500}
                onBackdropPress={() => setModalVisible(false)} // Fermeture du modal lors du clic sur le backdrop
                onSwipeComplete={() => setModalVisible(false)} // Fermeture du modal lors du swipe
            >
                <View style={styles.centeredView}>
                    <View>
                        <View style={styles.modalView}>
                            <Image style={styles.profilePic} source={require('../assets/Shulk.png')} />
                            <FontAwesome name='times' onPress={() => setModalVisible(!modalVisible)} size={40} />
                        </View>
                        <View style={styles.modalNav}>
                            <View style={styles.modalSection}>
                                <FontAwesome name='user' size={35} />
                                <View style={styles.modalAlign}>
                                    <Text style={styles.modalText}>My gigs</Text>
                                </View>
                            </View>
                            <View style={styles.modalSection}>
                                <FontAwesome name='bell' size={28} />
                                <View style={styles.modalAlign}>
                                    <Text style={styles.modalText}>Notifications</Text>
                                </View>
                            </View>
                            <View style={styles.modalSection}>
                                <FontAwesome name='globe' size={35} />
                                <View style={styles.modalAlign}>
                                    <Text style={styles.modalText}>Mon compte</Text>
                                </View>
                            </View>
                            <View style={styles.lastModalSection}>
                                <FontAwesome name='heart' size={30} />
                                <View style={styles.modalAlign}>
                                    <Text style={styles.modalText}>Saved</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.settings}>
                        <FontAwesome name='gear' size={50} />
                        <View style={styles.modalAlign}>
                            <Text style={styles.settingText}>Paramètres</Text>
                        </View>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity style={styles.btnModal} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.btnText}>Bouton Modal</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnModal: {
        backgroundColor: 'green',
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100
    },
    modal: {
        margin: 0
    },
    centeredView: {
        backgroundColor: '#E6E6E6',
        width: '80%',
        height: '100%',
        justifyContent: 'space-between'
    },
    modalView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    profilePic: {
        width: 70,
        height: 70,
        backgroundColor: 'red',
        borderRadius: 40
    },
    modalNav: {
        alignItems: 'center',
        marginTop: 20
    },
    modalSection: {
        flexDirection: 'row',
        width: '90%',
        height: 60,
        borderTopWidth: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15
    },
    lastModalSection: {
        flexDirection: 'row',
        width: '90%',
        height: 60,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15
    },
    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20
    },
    modalAlign: {
        width: 250
    },
    settings: {
        flexDirection: 'row',
        width: '90%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        marginBottom: 10,
        marginLeft: 10
    },
    settingText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 20
    }
});
