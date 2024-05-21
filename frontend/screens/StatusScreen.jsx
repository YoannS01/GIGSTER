import { TouchableOpacity, View } from "react-native";

export default function StatusScreen() {



    return (
        <View>
            <Text>Quel profil es tu ?</Text>
            <TouchableOpacity>
                <Text>Artiste</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Hôte</Text>
            </TouchableOpacity>
        </View>
    )
}