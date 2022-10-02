import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Modal, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import VerifyUser from '../components/VerifyUser';

const Login = (props) => {
    const [phoneNumber, changePhoneNumber] = useState("");
    const [country, changeCountry] = useState("");
    const [success, setSuccess] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [secondSuccess, setSecondSuccess] = useState(false);
    const [uuid, setUuid] = useState("");
    const [userObject, setUserObject] = useState({});

    async function submitData() {
        try {
            const response = await fetch('https://isoapp.dev/api/v1/users/startVerification', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({phone_number: phoneNumber, country: "US"})
            });
            
            let json = await response.json();
            let uuid = json.results;

            setUuid(uuid);
            setSuccess(true);

            console.log(json);

        } catch(error) {
            alert("Network failure!");
        }
    } 

    useEffect(() => {
        async function fn() { 
            const response = await fetch('https://isoapp.dev/api/v1/users/checkVerification', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify({"uuid": uuid, "code": verificationCode})
                });

            const test = await response.text();
            console.log(test);
        }
        fn();
    }, [verificationCode]);

    return (
        <View style={{width: '100%', height: '100%'}}> 
            <Modal transparent={true}
                visible={success}
                onRequestClose={() => {
                    setSuccess(false);
            }}>
                <View style={styles.modalContent}>
                    <VerifyUser updateVerificationCode={setVerificationCode} />
                </View>
            </Modal>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Sign up ✍️</Text>
                    <PhoneInput
                        withDarkTheme
                        onChangeText={(text) => {
                        changePhoneNumber(text);
                        }}
                    />
                    <TextInput
                        style={styles.countryInput}
                        placeholder='Enter your country name here'
                        onChangeText={changeCountry}
                        value={country}
                    />
                    <Pressable
                        onPress={submitData}
                        style={({ pressed }) => [
                            {
                            backgroundColor: pressed
                                ? '#349feb'
                                : '#348feb'
                            },
                            styles.wrapperCustom]}
                    ><Text style={{color: 'white'}}>Submit</Text></Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bypassBox:{

    },
    bypass: {
        // position: "absolute",
        // top: 30,
        // width: "100%",
        // height: "5%",
        // backgroundColor: "red",
    },
    title: {
        fontSize: 30,
        marginLeft: 10,
        paddingBottom: 20,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%"
    },
    countryInput: {
        backgroundColor: '#fff',
        height: 50,
        paddingLeft: 20
    },
    submitButton: {
        paddingTop: 40,
    },
    wrapperCustom: {
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContent: {
        backgroundColor: 'translucent',
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Login;