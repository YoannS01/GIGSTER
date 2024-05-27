import { useState } from "react"
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { getNextPage } from "../reducers/stepper";
import {
    updateAddress,
    updateBirthdate,
    updateFirstname,
    updateLastname,
    updatePhoneNumber
} from "../reducers/user";

export default function Step1(props) {
    const dispatch = useDispatch()
    const [step1Data, setStep1Data] = useState({
        firstname: '',
        lastname: '',
        street: '',
        city: '',
        zipcode: '',
        phoneNumber: '',
        birthdate: ''
    })

    function nextStep() {
        if (!step1Data.firstname || !step1Data.lastname || !step1Data.street || !step1Data.city || !step1Data.zipcode || !step1Data.phoneNumber || !step1Data.birthdate) {
            Alert.alert('Validation Error', 'Please fill out all fields ')
            return false;
        }

        dispatch(updateAddress({
            street: step1Data.street,
            city: step1Data.city,
            zipcode: step1Data.zipcode
        }));
        dispatch(updateFirstName(step1Data.firstname));
        dispatch(updateLastName(step1Data.lastname));
        dispatch(updateBirthDate(step1Data.birthdate));
        dispatch(updatePhoneNumber(step1Data.phonenumber));
        dispatch(getNextPage(true));
    }

    return (
        <View>
            <View style={styles.stepContent}>
                <Text style={styles.label}>Lastname</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Lastname"
                    value={step1Data.lastname}
                    onChangeText={text => setStep1Data({ ...step1Data, lastname: text })}
                />
                <Text style={styles.label}>Firstname</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Firstname"
                    value={step1Data.firstname}
                    onChangeText={text => setStep1Data({ ...step1Data, firstname: text })}
                />
                <Text style={styles.label}>Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Street"
                    value={step1Data.street}
                    onChangeText={text => setStep1Data({ ...step1Data, street: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="City"
                    value={step1Data.city}
                    onChangeText={text => setStep1Data({ ...step1Data, city: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Zipcode"
                    value={step1Data.zipcode}
                    onChangeText={text => setStep1Data({ ...step1Data, zipcode: text })}
                />
                <Text style={styles.label}>Phone number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Phone number"
                    value={step1Data.phoneNumber}
                    onChangeText={text => setStep1Data({ ...step1Data, phoneNumber: text })}
                />
                <Text style={styles.label}>Birthdate</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Birthdate"
                    value={step1Data.birthdate}
                    onChangeText={text => setStep1Data({ ...step1Data, birthdate: text })}
                />
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => nextStep()} >
                <Text style={styles.textBtn}>
                    Next
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    stepContent: {
        width: '100%',
        padding: 20,
        backgroundColor: 'white'
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
        marginTop: 20,
        alignSelf: 'center'
    },
    textBtn: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    }
});