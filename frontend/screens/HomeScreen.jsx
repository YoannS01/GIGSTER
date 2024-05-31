import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, Platform, Button, ImageBackground } from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

import AnnounceCard from '../components/AnnounceCard'
import AnnounceCardSearch from '../components/AnnounceCardSearch';
import TopCard from '../components/TopCard'

import ProfileScreen from "./ProfileScreen";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';





export default function HomeScreen() {

    const [modalVisible, setModalVisible] = useState(false);
    const [modalDisplay, setModalDisplay] = useState(0);
    const [cardsLiked, setCardsLiked] = useState([]);
    const [styleLike, setStyleLike] = useState({})
    const [searching, setSearching] = useState(false)
    const navigation = useNavigation()

    const user = useSelector(state => state.user.value)

    console.log(cardsLiked)

    const [modalContent, setModalContent] = useState({
        image: require("../assets/Felicita.png"),
        title: 'La Felicita',
        location: 'Paris 13',
        availability: '06 Juin - 17 Juin',
        note: '4.5'
    })

    const cardsData = [
        {
            image: require("../assets/Felicita.png"),
            title: 'La Felicita',
            location: 'Paris 13',
            availability: '06 Juin - 17 Juin',
            note: '4.5'
        },
        {
            image: require("../assets/Jardin.png"),
            title: `Jardin d'Arcachon`,
            location: 'Archachon',
            availability: '27 Mai - 02 Juin',
            note: '4.5'
        },
        {
            image: require("../assets/Lyon.png"),
            title: 'Batiment au nom bien long',
            location: 'Lyon',
            availability: '25 Mai - 13 Juillet',
            note: '4.3'
        },
        {
            image: require("../assets/Daddoo.png"),
            title: 'Dortoir du Seigneur',
            location: 'Bordeaux',
            availability: '25 Mai - 31 Mai',
            note: '2.4'
        },
        {
            image: require("../assets/Matelas.png"),
            title: 'Déchetterie (chez moi)',
            location: 'Tokyo',
            availability: '24 Juillet - 23 Janvier',
            note: '1.2'
        },
    ]



    const cardList = cardsData.map((data, i) => {
        return <TouchableOpacity key={i} onPress={() => {
            setModalContent({
                image: data.image,
                title: data.title,
                location: data.location,
                availability: data.availability,
                note: data.note
            })
            setModalDisplay(2)
            setModalVisible(true)

        }}>
            <AnnounceCard
                key={i}
                image={data.image}
                title={data.title}
                location={data.location}
                availability={data.availability}
                note={data.note}
            />
        </TouchableOpacity>
    })

    const cardListSearch = cardsData.map((data, i) => {
        return <TouchableOpacity key={i} onPress={() => {
            setModalContent({
                image: data.image,
                title: data.title,
                location: data.location,
                availability: data.availability,
                note: data.note
            })
            setModalDisplay(2)
            setModalVisible(true)
        }}>
            <AnnounceCardSearch
                key={i}
                image={data.image}
                title={data.title}
                location={data.location}
                availability={data.availability}
                note={data.note} />
        </TouchableOpacity>
    })

    const topData = [
        {
            image: require("../assets/PP1.png"),
            name: 'Taylor Swift'
        },
        {
            image: require("../assets/PP2.png"),
            name: 'The Weeknd'
        },
        {
            image: require("../assets/PP3.png"),
            name: 'Travis Scott'
        },
        {
            image: require("../assets/PP4.png"),
            name: 'Owl City'
        },
        {
            image: require("../assets/PP5.png"),
            name: 'Jul'
        },
        {
            image: require("../assets/PP6.png"),
            name: 'Daft Punk'
        },
        {
            image: require("../assets/PP7.png"),
            name: 'PNL'
        },
        {
            image: require("../assets/PP8.png"),
            name: 'Blackpink'
        },
        {
            image: require("../assets/PP9.png"),
            name: 'Mylène Farmer'
        },
        {
            image: require("../assets/PP10.png"),
            name: 'Franky Vincent'
        },
    ]

    const topList = topData.map((data, i) => {
        return <TopCard
            key={i}
            image={data.image}
            name={data.name} />

    })

    function navigateModal() {
        navigation.navigate("TabNavigator", { screen: "Profile" });
        setModalVisible(!modalVisible)
    }

    function logout() {
        navigation.navigate("LoginScreen");
    }

    function handleLike(title) {
        if (!cardsLiked.some(e => e === title)) {
            setCardsLiked([...cardsLiked, title])
        } else {
            setCardsLiked(cardsLiked.filter(e => e !== title))
        }
    }


    const modalUserContent = (
        <Modal style={styles.modal}
            isVisible={modalVisible}
            swipeDirection="left"
            animationInTiming={500}
            animationIn="slideInLeft"
            animationOut="slideOutLeft"
            hideModalContentWhileAnimating={true}
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={500}
            onBackdropPress={() => {
                setModalDisplay(0)
                setModalVisible(false)
            }}
            onSwipeComplete={() => {
                setModalDisplay(0)
                setModalVisible(false)
            }}
        >
            <View style={styles.centeredView}>
                <View>
                    <View style={styles.modalView}>
                        <Image style={styles.profilePic} source={require('../assets/Shulk.png')} />
                        <FontAwesome name='times' onPress={() => {
                            setModalDisplay(0)
                            setModalVisible(false)
                        }} size={40} />
                    </View>
                    <View style={styles.modalNav}>
                        <TouchableOpacity onPress={() => navigateModal()}>
                            <View style={styles.modalSection}>
                                <FontAwesome name='user' size={35} style={styles.iconModal} />
                                <View style={styles.modalAlign}>
                                    <Text style={styles.modalText}  >Profile</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.modalSection}>
                            <FontAwesome name={user.isArtist ? 'globe' : 'music'} size={35} style={styles.iconModal} />
                            <View style={styles.modalAlign}>
                                <Text style={styles.modalText}>{user.isArtist ? 'My tours' : 'My bookings'}</Text>
                            </View>
                        </View>
                        <View style={styles.modalSection}>
                            <FontAwesome name='heart' size={28} style={styles.iconModal} />
                            <View style={styles.modalAlign}>
                                <Text style={styles.modalText}>{user.isArtist ? 'Liked hosts' : 'Liked artists'}</Text>
                            </View>
                        </View>
                        <View style={styles.modalSection}>
                            <FontAwesome name='star' size={30} style={styles.iconModal} />
                            <View style={styles.modalAlign}>
                                <Text style={styles.modalText}>Preferences</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => logout()}>
                            <View style={styles.lastModalSection}>
                                <FontAwesome name='close' size={30} style={styles.iconModal} />
                                <View style={styles.modalAlign}>
                                    <Text style={styles.modalText}>Log out</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.settings}>
                    <FontAwesome name='gear' size={40} />
                    <View style={styles.modalAlign}>
                        <Text style={styles.settingText}>Settings</Text>
                    </View>
                </View>
            </View>
        </Modal>
    )

    const modalCardContent = (
        <Modal
            isVisible={modalVisible}
            swipeDirection="down"
            animationInTiming={500}
            animationIn="slideInUp"
            animationOut="slideOutUp"
            hideModalContentWhileAnimating={true}
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={500}
            onBackdropPress={() => {
                setModalDisplay(0)
                setModalVisible(false)
            }}
            onSwipeComplete={() => {
                setModalDisplay(0)
                setModalVisible(false)
            }}
        >
            <View style={styles.cardCenteredView}>
                <Image style={styles.firstImage} source={modalContent.image}></Image>
                <View style={styles.cardModalDesc}>
                    <View style={styles.titleModalDesc}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{modalContent.title}</Text>
                    </View>
                    <View style={styles.iconDesc}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                            <FontAwesome name='star' size={40} color={'#d4a60f'} />
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }} >{modalContent.note}</Text>
                        </View>
                        <FontAwesome name='heart' size={35} onPress={() => handleLike(modalContent.title)}
                            style={cardsLiked.includes(modalContent.title) && { color: 'red' }} />
                    </View>
                    <View style={styles.infoDesc}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{modalContent.location}</Text>
                        <View style={styles.modalAvailability}>
                            <Text>Dates of availability</Text>
                            <Text style={{ fontWeight: 'bold' }}>{modalContent.availability}</Text>
                        </View>
                        <Text style={styles.bioDesc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni provident praesentium quasi impedit explicabo odio! Nam provident, perspiciatis saepe, suscipit voluptas deserunt minima quia, nisi et repellat qui a dolorum.
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus, atque iusto dicta odio maxime veritatis. Voluptatibus ex repudiandae cumque consequatur minus dolore fuga, facere eveniet nemo illum animi, beatae repellendus.
                            Lorem</Text>
                    </View>
                </View>
            </View>
        </Modal>
    )

    return (
        <View style={styles.container}>
            {modalDisplay === 1 && modalUserContent}
            {modalDisplay === 2 && modalCardContent}


            <View style={styles.header}>
                <TouchableOpacity style={styles.btnModal} onPress={() => {
                    setModalDisplay(1)
                    setModalVisible(true)
                }
                }>
                    <Image style={styles.profilePicMenu} source={require('../assets/Shulk.png')} />
                </TouchableOpacity>
                <View style={styles.searchField}>
                    <TextInput
                        placeholder={user.isArtist ? "Find your future hosts" : "Find your future artists"}
                        style={styles.input}
                    ></TextInput>
                    <TouchableOpacity style={styles.btnSearch} onPress={() => setSearching(true)}>
                        <Text style={styles.textSearch}>
                            Search
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {!searching ?
                <View>
                    <Text style={styles.welcome}>Welcome {user.username}</Text>
                    <Text style={styles.discover}>Discover...</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.recoZone} >
                        {cardList}
                    </ScrollView>
                    <Text style={styles.titleRanking}>Top Artist</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.topZone}>
                        {topList}
                    </ScrollView>
                </View> :

                <ScrollView style={styles.recoZoneSearching} >
                    <View style={styles.searchTitle}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Results for Bordeaux : </Text>
                        <FontAwesome name='close' size={30} onPress={() => setSearching(false)} />
                    </View>
                    {cardListSearch}
                </ScrollView>


            }
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0E7F6',
        height: '100%'
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
        height: '5%'
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
        height: '6%'
    },
    recoZone: {
        width: '100%',
        height: '35%',
        flexDirection: 'row'
    },
    recoZoneSearching: {
        width: '100%',
        height: '80%',
        marginLeft: '2%'
    },
    topZone: {
        width: '100%',
        height: '23%',
        flexDirection: 'row'
    },
    btnModal: {
        width: '20%',
        marginRight: 10
    },
    modal: {
        margin: 0,
    },
    centeredView: {
        backgroundColor: '#E6E6E6',
        width: '80%',
        height: '100%',
        justifyContent: 'space-between',
    },
    cardCenteredView: {
        backgroundColor: '#E6E6E6',
        width: '100%',
        height: '95%',
        justifyContent: 'space-between',
        borderRadius: 15,
        borderWidth: 6,
        overflow: 'hidden'
    },
    modalView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    profilePic: {
        width: 70,
        height: 70,
        borderRadius: 40
    },
    profilePicMenu: {
        width: 80,
        height: 80,
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
    },
    lastModalSection: {
        flexDirection: 'row',
        width: '90%',
        height: 60,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconModal: {
        width: '15%',
        textAlign: 'center'
    },
    modalText: {
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 10
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
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20
    },
    searchTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '5%',
        paddingRight: '12%',
    },
    firstImage: {
        height: '25%',
        objectFit: 'cover',
        width: '100%',
    },
    cardModalDesc: {
        height: '75%',
        width: '100%',
        backgroundColor: '#E6E6E6',
        borderTopWidth: 3
    },
    infoDesc: {
        height: '80%',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    bioDesc: {
        height: '60%',
        textAlign: 'justify',
        overflow: 'hidden'
    },
    modalAvailability: {
        alignItems: 'center'
    },
    iconDesc: {
        height: '10%',
        paddingLeft: '5%',
        paddingRight: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleModalDesc: {
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    belowNavbar: {
        height: '10%',
        backgroundColor: 'green'
    }
});
