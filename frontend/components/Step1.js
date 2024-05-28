import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useDispatch } from "react-redux";
import { getNextPage } from "../reducers/stepper";
import DatePicker from '@react-native-community/datetimepicker'
import { Formik } from 'formik';
import * as yup from 'yup';
import {
    updateAddress,
    updateBirthdate,
    updateFirstname,
    updateLastname,
    updatePhoneNumber
} from "../reducers/user";

// Schéma de validation yup
const validationSchema = yup.object().shape({
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    street: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
    zipcode: yup.string().required('Zipcode is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    birthdate: yup.date().required('Birthdate is required'),
});

export default function Step1(props) {

    function nextStep(values) {
        console.log("date venant de l'input : ", values.birthdate)
        props.updateUser({
            address: {
                street: values.street,
                city: values.city,
                zipcode: values.zipcode
            },
            firstname: values.firstname,
            lastname: values.lastname,
            birthdate: values.birthdate,
            phoneNumber: values.phoneNumber,
        })
    }

    const setDate = (event, date) => {
        const {
            nativeEvent: { timestamp, utcOffset },
        } = event;
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        >
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    street: '',
                    city: '',
                    zipcode: '',
                    phoneNumber: '',
                    birthdate: new Date()
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => nextStep(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                    <View>
                        <View style={styles.stepContent}>
                            <Text style={styles.label}>Lastname</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Lastname"
                                onChangeText={handleChange('lastname')}
                                onBlur={handleBlur('lastname')}
                                value={values.lastname}
                            />
                            {touched.lastname && errors.lastname && <Text style={styles.error}>{errors.lastname}</Text>}

                            <Text style={styles.label}>Firstname</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Firstname"
                                onChangeText={handleChange('firstname')}
                                onBlur={handleBlur('firstname')}
                                value={values.firstname}
                            />
                            {touched.firstname && errors.firstname && <Text style={styles.error}>{errors.firstname}</Text>}

                            <Text style={styles.label}>Address</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Street"
                                onChangeText={handleChange('street')}
                                onBlur={handleBlur('street')}
                                value={values.street}
                            />
                            {touched.street && errors.street && <Text style={styles.error}>{errors.street}</Text>}

                            <TextInput
                                style={styles.input}
                                placeholder="City"
                                onChangeText={handleChange('city')}
                                onBlur={handleBlur('city')}
                                value={values.city}
                            />
                            {touched.city && errors.city && <Text style={styles.error}>{errors.city}</Text>}

                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                placeholder="Zipcode"
                                onChangeText={handleChange('zipcode')}
                                onBlur={handleBlur('zipcode')}
                                value={values.zipcode}
                            />
                            {touched.zipcode && errors.zipcode && <Text style={styles.error}>{errors.zipcode}</Text>}

                            <Text style={styles.label}>Phone number</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                placeholder="Phone number"
                                onChangeText={handleChange('phoneNumber')}
                                onBlur={handleBlur('phoneNumber')}
                                value={values.phoneNumber}
                            />
                            {touched.phoneNumber && errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber}</Text>}

                            <Text style={styles.label}>Birthdate</Text>
                            <DatePicker
                                style={styles.datePicker}
                                value={new Date(values.birthdate)}
                                mode="date"
                                positiveButton={{ label: 'OK', textColor: 'green' }}
                                negativeButton={{ label: 'Cancel', textColor: 'red' }}
                                onChange={(event, date) => { setFieldValue('birthdate', new Date(date)) }}
                                locale='fr-FR'
                            />
                            {touched.birthdate && errors.birthdate && <Text style={styles.error}>{errors.birthdate}</Text>}
                        </View>
                        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                            <Text style={styles.textBtn}>Next</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </KeyboardAvoidingView>
    );
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
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        marginTop: 5
    },
    datePicker: {
        width: '100%',
        marginTop: 10
    },
    btn: {
        backgroundColor: '#5100FF',
        paddingVertical: 6,
        paddingHorizontal: 10,
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
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 5
    }
});
