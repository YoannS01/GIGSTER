import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';


export default function AddScreen() {
    const user = useSelector(state => state.value)





    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        >
            <View style={styles.container}>
                <Text>ADD PAGE</Text>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e1f5ff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});