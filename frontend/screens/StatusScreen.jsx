<<<<<<< HEAD
import { TouchableOpacity, View, Text } from "react-native";
=======
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
>>>>>>> 4cfa60bd5bec8253255699ee5e02c29cbafa0a12

export default function StatusScreen() {
    const dispatch = useDispatch()
    const [isArtist, setIsArtist] = useState(false)
    const [isHost, setIsHost] = useState(false)

    const user = useSelector(state => state.user.value)







    return (
<<<<<<< HEAD
        <View style={styles.container}>
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
