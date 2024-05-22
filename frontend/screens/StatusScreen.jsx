import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

export default function StatusScreen() {
    const dispatch = useDispatch()
    const [isArtist, setIsArtist] = useState(false)
    const [isHost, setIsHost] = useState(false)

    const user = useSelector(state => state.user.value)







    return (
        <View>
            <Text>Quel profil es tu ?</Text>
            <TouchableOpacity onPress={() => handleArtist()}>
                <Text>Artiste</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleHost()}>
                <Text>Hôte</Text>
            </TouchableOpacity>
        </View>
    )
}