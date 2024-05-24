import { useState } from "react";
import {
    Alert,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Text
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getNextPage } from "../reducers/stepper";
import { getArtistInfos, getHostInfos } from "../reducers/user";
import { FRONT_IP } from "../hide-ip"

export default function Step2() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);

    // Variable d'états pour artiste
    const [step2Data, setStep2Data] = useState({
        artistName: '',
        member: 0,
        genre: [],
        placeOrigin: ''
    });

    // Variable d'états pour host
    const [hostStep2Data, setHostStep2Data] = useState({
        description: '',
        favoriteGenre: []
    });
    console.log(step2Data)
    function submitInfos() {
        if (user.isArtist) {
            // Check artist fields
            if (!step2Data.artistName || !step2Data.member || !step2Data.genre || !step2Data.placeOrigin) {
                Alert.alert('Validation Error', 'Please fill out all fields');
                return false;
            }
            console.log("ARTIST", step2Data)
            // Dispatch artist info
            dispatch(getArtistInfos({
                artistName: step2Data.artistName,
                member: parseInt(step2Data.member, 10),
                genre: step2Data.genre,
                placeOrigin: step2Data.placeOrigin,
            }));

        } else if (user.isHost) {
            // Check host fields
            if (!hostStep2Data.description || !hostStep2Data.favoriteGenre) {
                Alert.alert('Validation Error', 'Please fill out all fields');
                return false;
            }
            // Dispatch host info
            dispatch(getHostInfos({
                description: hostStep2Data.description,
                favoriteGenre: hostStep2Data.favoriteGenre,
            }));
        }

        console.log("USER=>", user)




    };

    const previousPage = () => {
        dispatch(getNextPage(false));
    };

    return (
        <View>
            <Text>Mon Profil</Text>
            {!user.isHost ? (
                <View style={styles.stepContent}>
                    <Text style={styles.label}>Artist name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="name"
                        value={step2Data.artistName}
                        onChangeText={text => setStep2Data({ ...step2Data, artistName: text })}
                    />
                    <Text style={styles.label}>Member</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Number"
                        value={step2Data.member}
                        keyboardType="numeric"
                        onChangeText={text => setStep2Data({ ...step2Data, member: text })}
                    />
                    <Text style={styles.label}>Genre</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Genre"
                        value={step2Data.genre}
                        onChangeText={text => setStep2Data({ ...step2Data, genre: text })}
                    />
                    <Text style={styles.label}>Place of origin</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="City"
                        value={step2Data.placeOrigin}
                        onChangeText={text => setStep2Data({ ...step2Data, placeOrigin: text })}
                    />
                </View>
            ) : (
                <View style={styles.stepContent}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={hostStep2Data.description}
                        onChangeText={text => setHostStep2Data({ ...hostStep2Data, description: text })}
                    />
                    <Text style={styles.label}>Favorite genre(s)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Favorite genre"
                        value={hostStep2Data.favoriteGenre}
                        onChangeText={text => setHostStep2Data({ ...hostStep2Data, favoriteGenre: text })}
                    />
                </View>
            )}

            <TouchableOpacity style={styles.btn} onPress={submitInfos}>
                <Text style={styles.textBtn}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={previousPage}>
                <Text style={styles.textBtn}>Previous</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainSelect: {
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        marginHorizontal: 5,
        marginTop: 10
    },
    input: {
        backgroundColor: 'white',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        marginTop: 5
    },
    btn: {
        backgroundColor: '#5100FF',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        marginTop: 10
    },
    stepContent: {
        marginVertical: 20,
    },
    textBtn: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});
