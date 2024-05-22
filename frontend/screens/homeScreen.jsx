import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Pressable, Image, TextInput, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function HomeScreen() {

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
            <View style={styles.header}>
                <TouchableOpacity style={styles.btnModal} onPress={() => setModalVisible(!modalVisible)}>
                    <Image style={styles.profilePicMenu} source={require('../assets/Shulk.png')} />
                </TouchableOpacity>
                <View style={styles.searchField}>
                    <TextInput
                        placeholder="Find your future hosts"
                        style={styles.input}
                    ></TextInput>
                    <TouchableOpacity style={styles.input_signin_button}>
                        <Text style={styles.btnSearch}>
                            Search
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.welcome}>Welcome JustneedVic</Text>
            <Text style={styles.discover}>Discover...</Text>
            <ScrollView horizontal={true} style={styles.recoZone}>
                <View style={styles.recoCard}>

                </View>
                <View style={styles.recoCard}>

                </View>
                <View style={styles.recoCard}>

                </View>
                <View style={styles.recoCard}>

                </View>
                <View style={styles.recoCard}>

                </View>
            </ScrollView>
            <Text style={styles.titleRanking}>Top Artist</Text>
            <ScrollView horizontal={true} style={styles.topZone}>
                <View style={styles.topCard}>

                </View>
                <View style={styles.topCard}>

                </View>
                <View style={styles.topCard}>

                </View>
                <View style={styles.topCard}>

                </View>
                <View style={styles.topCard}>

                </View>
            </ScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0E7F6'
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    searchField: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
        height: '70%',
        borderRadius: 15,
        borderWidth: 2,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white'
    },
    input: {
        width: '70%'
    },
    btnSearch: {
        backgroundColor: '#5100FF',
        color: 'white',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        fontWeight: 'bold',
        borderWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 3
    },
    welcome: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 25,
        marginBottom: 10
    },
    discover: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    titleRanking: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 25,
    },
    recoZone: {
        width: '100%',
        height: '40%',
        flexDirection: 'row'
    },
    recoCard: {
        width: 300,
        height: '90%',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderBottomWidth: 6,
        borderRightWidth: 6
    },
    topZone: {
        width: '100%',
        height: '28%',
        flexDirection: 'row'
    },
    topCard: {
        width: 150,
        height: '80%',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderBottomWidth: 6,
        borderRightWidth: 6
    },
    btnModal: {
        width: '20%',
        marginRight: 10
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
    profilePicMenu: {
        width: 80,
        height: 80,
        backgroundColor: 'red',
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'black',
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
