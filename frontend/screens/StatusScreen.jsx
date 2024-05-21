import { TouchableOpacity, View, Text } from "react-native";

export default function StatusScreen() {



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Je suis un..</Text>
            <TouchableOpacity style={styles.input_button}>
                <Text style={styles.text_button}>Artiste</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.input_button}>
                <Text style={styles.text_button}>Hôte</Text>
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
