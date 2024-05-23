import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, Platform, Button } from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';



export default function HomeScreen() {

    const [modalVisible, setModalVisible] = useState(false);

    //   const [image, setImage] = useState(null);

    //    const pickImage = async () => {
    //         // Request permission to access media library
    //         if (Platform.OS !== 'web') {
    //             const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //             if (status !== 'granted') {
    //                 alert('Sorry, we need camera roll permissions to make this work!');
    //                 return;
    //             }
    //         }

    // Open the image picker
    // let result = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //     allowsEditing: true,
    //     aspect: [4, 3],
    //     quality: 1,
    // });

    //     if (!result.canceled) {
    //         setImage(result.assets[0].uri);
    //     }
    // };

    // <Button title="Pick an image from camera roll" onPress={pickImage} />
    // {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

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
                    <TouchableOpacity style={styles.btnSearch}>
                        <Text style={styles.textSearch}>
                            Search
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.welcome}>Welcome JustneedVic</Text>
            <Text style={styles.discover}>Discover...</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.recoZone}>
                <View style={styles.recoCard}>
                    <View style={styles.recoImage}>
                        <Image style={styles.recoImg} source={require('../assets/Felicita.png')} />
                    </View>
                    <View style={styles.recoDesc}>
                        <View>
                            <Text style={styles.recoTitle}>La Felicita</Text>
                            <Text style={styles.recoPlace}>Paris 13</Text>
                            <Text>06 Juin - 17 Juin</Text>
                        </View>
                        <View style={styles.recoNote}>
                            <FontAwesome name='star' size={30} color={'#d4a60f'} />
                            <Text style={styles.recoPlace}>4.5</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.recoCard}>
                    <View style={styles.recoImage}>
                        <Image style={styles.recoImg} source={require('../assets/Jardin.png')} />
                    </View>
                    <View style={styles.recoDesc}>
                        <View>
                            <Text style={styles.recoTitle}>Jardin d'Arcachon</Text>
                            <Text style={styles.recoPlace}>Arcachon</Text>
                            <Text>27 Mai - 02 Juin</Text>
                        </View>
                        <View style={styles.recoNote}>
                            <FontAwesome name='star' size={30} color={'#d4a60f'} />
                            <Text style={styles.recoPlace}>3.8</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.recoCard}>
                    <View style={styles.recoImage}>
                        <Image style={styles.recoImg} source={require('../assets/Lyon.png')} />
                    </View>
                    <View style={styles.recoDesc}>
                        <View>
                            <Text style={styles.recoTitle}>Batiment au nom bi...</Text>
                            <Text style={styles.recoPlace}>Lyon</Text>
                            <Text>25 Mai - 13 Juillet</Text>
                        </View>
                        <View style={styles.recoNote}>
                            <FontAwesome name='star' size={30} color={'#d4a60f'} />
                            <Text style={styles.recoPlace}>4.3</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.recoCard}>
                    <View style={styles.recoImage}>
                        <Image style={styles.recoImg} source={require('../assets/Daddoo.png')} />
                    </View>
                    <View style={styles.recoDesc}>
                        <View>
                            <Text style={styles.recoTitle}>Dortoir du Seigneur</Text>
                            <Text style={styles.recoPlace}>Bordeaux</Text>
                            <Text>25 Mai - 31 Mai</Text>
                        </View>
                        <View style={styles.recoNote}>
                            <FontAwesome name='star' size={30} color={'#d4a60f'} />
                            <Text style={styles.recoPlace}>2.4</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.recoCard}>
                    <View style={styles.recoImage}>
                        <Image style={styles.recoImg} source={require('../assets/Matelas.png')} />
                    </View>
                    <View style={styles.recoDesc}>
                        <View>
                            <Text style={styles.recoTitle}>Déchéterie (chez moi)</Text>
                            <Text style={styles.recoPlace}>Tokyo</Text>
                            <Text>24 Juillet - 23 Janvier</Text>
                        </View>
                        <View style={styles.recoNote}>
                            <FontAwesome name='star' size={30} color={'#d4a60f'} />
                            <Text style={styles.recoPlace}>1.2</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Text style={styles.titleRanking}>Top Artist</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.topZone}>
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
        alignItems: 'center',
        justifyContent: 'center',
        height: '20%',
        paddingTop: 20,
    },
    searchField: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
        height: '40%',
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
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 3
    },
    textSearch: {
        color: 'white',
        fontWeight: 'bold',
    },
    welcome: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 25,
        marginBottom: 10,
        height: '4%'
    },
    discover: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 20,
        height: '3%'
    },
    titleRanking: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 25,
        height: '5%'
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
    },
    recoImage: {
        width: '100%',
        height: '70%',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 6,
        borderBottomWidth: 1,
        overflow: 'hidden'
    },
    recoImg: {
        width: '105%',
        height: '105%',
    },
    recoDesc: {
        width: '100%',
        height: '30%',
        backgroundColor: 'white',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        borderTopWidth: 1,
        borderLeftWidth: 2,
        borderRightWidth: 6,
        borderBottomWidth: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 15,
    },
    recoTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    recoPlace: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    recoNote: {
        justifyContent: 'center'
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
