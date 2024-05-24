import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

const ProgressStepsComponent = (props) => {
    const [step1Data, setStep1Data] = useState({
        firstname: '',
        lastname: '',
        street: '',
        city: '',
        zipcode: '',
        phoneNumber: '',
        birthdate: ''
    });
    const [step2Data, setStep2Data] = useState({
        artistName: '',
        member: '',
        genre: [],
        placeOrigin: ''

    });

    const [hostStep2Data, setHostStep2Data] = useState({
        description: '',
        favoriteGenre: ''
    })

    function validateStep1() {
        if (!step1Data.firstname || !step1Data.lastname || !step1Data.street || !step1Data.city || !step1Data.zipcode || !step1Data.phoneNumber || !step1Data.birthdate) {
            Alert.alert('Validation Error', 'Please fill out all fields ')
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        if (!step2Data.artistName || !step2Data.member || !step2Data.genre || !step2Data.placeOrigin) {
            Alert.alert('Validation Error', 'Please fill out all fields in Step 2.');
            return false;
        }
        return true;
    };

    return (
        <View style={styles.mainSelect}>
            <ProgressSteps >
                <ProgressStep label="Mes infos" onNext={validateStep1} nextBtnStyle={styles.nextBtnStyle}>
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
                            value={step1Data.address}
                            onChangeText={text => setStep1Data({ ...step1Data, street: text })}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="City"
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

                {!props.isHost ?
                    <ProgressStep label="Mon projet" onNext={validateStep2} onPrevious={() => { validateStep1 }}>
                        <View style={styles.stepContent}>
                            <Text style={styles.label}>Artist name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="name"
                                value={step2Data.artistName}
                                onChangeText={text => setStep2Data({ ...step2Data, artistName: text })}
                            />
                            <Text style={styles.label}>Member</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Number"
                                value={step2Data.member}
                                onChangeText={text => setStep2Data({ ...step2Data, member: text })}
                            />
                            <Text style={styles.label}>Genre</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Genre"
                                value={step2Data.genre}
                                onChangeText={text => setStep2Data({ ...step2Data, genre: text })}
                            />
                            <Text style={styles.label}>Place of origin</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="City"
                                value={step2Data.placeOrigin}
                                onChangeText={text => setStep2Data({ ...step2Data, placeOrigin: text })}
                            />
                        </View>
                    </ProgressStep>
                    :
                    <ProgressStep label="Mon profil" onNext={validateStep2} onPrevious={() => { validateStep1 }}>
                        <View style={styles.stepContent}>
                            <Text style={styles.label}>Description</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Description"
                                value={hostStep2Data.description}
                                onChangeText={text => setStep2Data({ ...hostStep2Data, description: text })}
                            />
                            <Text style={styles.label}>Favorite genre(s)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Favorite genre"
                                value={HostStep2Data.member}
                                onChangeText={text => setStep2Data({ ...hostStep2Data, favoriteGenre: text })}
                            />


                        </View>
                    </ProgressStep>
                }
            </ProgressSteps>
        </View>
    );
};

const styles = StyleSheet.create({

    mainSelect: {
        width: '100%',
        height: '100%',
        backgroundColor: '#e1f5ff',
        alignItems: 'center',
        justifyContent: 'center',
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
    nextBtnStyle: {
        backgroundColor: '#5100FF',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        color: 'white',
    },
});

export default ProgressStepsComponent;
