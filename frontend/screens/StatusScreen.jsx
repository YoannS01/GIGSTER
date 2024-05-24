import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProgressStepsComponent from "../components/ProgessStepsComponent";
import { updateArtist, updateHost } from "../reducers/user";


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
                        <Text style={styles.text}>HÃ´te</Text>
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
});
