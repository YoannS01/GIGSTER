import { FRONT_IP } from "../hide-ip";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

export default function StatusScreen() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.value)
    //variable d'états :
    const [isArtist, setIsArtist] = useState(false)
    const [isHost, setIsHost] = useState(false)

    function handleArtist() {
        if (user.token) {
            dispatch(setIsArtist(true))
        }

    }

    function handleHost() {
        if (user.token) {
            dispatch(setIsHost(true))
        }

    }


    const ProgressStepsComponent = () => {
        const [step1Data, setStep1Data] = useState({ name: '', address: '' });
        const [step2Data, setStep2Data] = useState({ email: '', username: '' });



        const validateStep1 = () => {
            if (!step1Data.firstname || !step1Data.lastname || !step1Data.street || !step1Data.city || !step1Data.zipcode || !step1Data.phoneNumber || !step1Data.birthdate) {
                Alert.alert('Validation Error', 'Please fill out all fields in Step 1.');
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
            <View style={styles.container}>
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







    return (
        <View>
            <View>
                <Text>Quel profil es tu ?</Text>
                <TouchableOpacity onPress={() => handleArtist()}>
                    <Text>Artiste</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleHost()}>
                    <Text>Hôte</Text>
                </TouchableOpacity>
            </View>
            <View>
                {isArtist &&
                    <ProgressSteps>
                        <ProgressStep label="First Step">
                            <View style={{ alignItems: 'center' }}>
                                <Text>Informations User additionnelles</Text>
                            </View>
                        </ProgressStep>
                        <ProgressStep label="Second Step">
                            <View style={{ alignItems: 'center' }}>
                                <Text>Set up ton profil Artiste</Text>
                            </View>
                        </ProgressStep>
                    </ProgressSteps>}
            </View>
            <View>
                {isHost &&
                    <ProgressSteps>
                        <ProgressStep label="First Step">
                            <View style={{ alignItems: 'center' }}>
                                <Text>Informations User additionnelles</Text>

                            </View>
                        </ProgressStep>
                        <ProgressStep label="Second Step">
                            <View style={{ alignItems: 'center' }}>
                                <Text>Set up ton profil Hôte</Text>
                            </View>
                        </ProgressStep>
                    </ProgressSteps>}
            </View>

        </View>
    )
}