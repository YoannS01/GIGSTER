import { useState } from "react"
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { getNextPage } from "../reducers/stepper";
import {
    updateAddress,
    updateBirthDate,
    updateFirstName,
    updateLastName,
    updatePhoneNumber
} from "../reducers/user";

export default function Step1(props) {
    const dispatch = useDispatch()
    const [step1Data, setStep1Data] = useState({
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        zipCode: '',
        phoneNumber: '',
        birthDate: ''
    })

    function nextStep() {
        if (!step1Data.firstName || !step1Data.lastName || !step1Data.street || !step1Data.city || !step1Data.zipCode || !step1Data.phoneNumber || !step1Data.birthDate) {
            Alert.alert('Validation Error', 'Please fill out all fields ')
            return false;
        }

        dispatch(updateAddress({
            street: step1Data.street,
            city: step1Data.city,
            zipCode: step1Data.zipCode
        }));
        dispatch(updateFirstName(step1Data.firstName));
        dispatch(updateLastName(step1Data.lastName));
        dispatch(updateBirthDate(step1Data.birthDate));
        dispatch(updatePhoneNumber(step1Data.phoneNumber));
        dispatch(getNextPage(true));
    }

    return (
        <View>
            <View style={styles.stepContent}>
                <Text style={styles.label}>Lastname</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Lastname"
                    value={step1Data.lastName}
                    onChangeText={text => setStep1Data({ ...step1Data, lastName: text })}
                />
                <Text style={styles.label}>Firstname</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Firstname"
                    value={step1Data.firstName}
                    onChangeText={text => setStep1Data({ ...step1Data, firstName: text })}
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
                    value={step1Data.zipCode}
                    onChangeText={text => setStep1Data({ ...step1Data, zipCode: text })}
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
                    value={step1Data.birthDate}
                    onChangeText={text => setStep1Data({ ...step1Data, birthDate: text })}
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