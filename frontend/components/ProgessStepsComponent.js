import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

const ProgressStepsComponent = () => {
    const [step1Data, setStep1Data] = useState({ name: '', address: '' });
    const [step2Data, setStep2Data] = useState({ email: '', username: '' });

    function validateStep1() {
        if (!step1Data.firstname || !step1Data.lastname || !step1Data.street || !step1Data.city || !step1Data.zipcode || !step1Data.phoneNumber || !step1Data.birthdate) {
            Alert.alert('Validation Error', 'Please fill out all fields ')
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        if (!step2Data.email || !step2Data.username) {
            Alert.alert('Validation Error', 'Please fill out all fields in Step 2.');
            return false;
        }
        return true;
    };

    return (
        <View style={styles.mainSelect}>
            <ProgressSteps>
                <ProgressStep label="Step 1" onNext={validateStep1}>
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
                            placeholder="Address"
                            value={step1Data.address}
                            onChangeText={text => setStep1Data({ ...step1Data, street: text })}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            value={step1Data.address}
                            onChangeText={text => setStep1Data({ ...step1Data, city: text })}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Zipcode"
                            value={step1Data.address}
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
                </ProgressStep>

                <ProgressStep label="Step 2" onNext={validateStep2} onPrevious={() => { validateStep1 }}>
                    <View style={styles.stepContent}>
                        <Text style={styles.label}>Artist name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="name"
                            value={step2Data.email}
                            onChangeText={text => setStep2Data({ ...step2Data, artistName: text })}
                        />
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={step2Data.username}
                            onChangeText={text => setStep2Data({ ...step2Data, username: text })}
                        />
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={step2Data.username}
                            onChangeText={text => setStep2Data({ ...step2Data, username: text })}
                        />
                    </View>
                </ProgressStep>
            </ProgressSteps>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginHorizontal: 5,
        marginTop: 10

    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#e8f5e9',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        marginTop: 10
    },
});

export default ProgressStepsComponent;
