import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react'
import OTPTextInput from 'react-native-otp-textinput'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, SafeAreaView } from 'react-native'
import { styles } from './styles'
import { verifyotp } from '../API';
import { resendotp } from '../API';

export default function LoginOTP({ route }) {

    const [enteredOTP, setEnteredOTP] = useState('');
    const [id, setid] = useState('');
    const [userDataObject, setUserDataObject] = useState(null);
    const [timer, setTimer] = useState(120); // Initial timer value in seconds
    const [showResend, setShowResend] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    // user_id
    // otp
    const navigateToNextScreen = async () => {
        if (enteredOTP === '') {
            alert('Please enter a OTP.');
        } else {
            setLoading(true);

            const data = {
                user_id: id,
                otp: enteredOTP,
            };
            const Otpres = await verifyotp(global.URL + 'verifyotp', data);
            setLoading(false);

            // console.log('*******verifyotp data Otpres', Otpres)

            if (Otpres.success == true) {
                const data = route.params;
                await AsyncStorage.setItem('finalRes', JSON.stringify(data));
                navigation.navigate('Home');
            } else {
                alert('Invalid OTP')
            }
        }
    };
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Function to start the timer
    const startTimer = () => {
        setTimer(120); // Set the timer to the desired duration
        setShowResend(false)
    };

    const handleResend = async () => {
        clearInterval(intervalId);
        startTimer();
        const newIntervalId = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(newIntervalId);
                    setShowResend(true);
                    return 0;
                }
            });
        }, 1000);
        setIntervalId(newIntervalId);

        setLoading(true);
        const data = {
            user_id: id,
        };
        const reOTP = await resendotp(global.URL + 'resendotp', data);
        // console.log('*******resendotp reOTP data', reOTP)
        setLoading(false);

        if (reOTP.success == true) {
            alert('Successfully sent')
        } else {
            alert('Successfully not sent')
        }

    };

    useEffect(() => {
        let newIntervalId = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(newIntervalId);
                    setShowResend(true);
                    return 0;
                }
            });
        }, 1000);
        setIntervalId(newIntervalId);

        const loadData = async () => {
            try {
                //const userData = await AsyncStorage.getItem('finalRes');
                //const userDataArray = JSON.parse(userData);

                const data = route.params;
                // console.log('data-route--',data)

                if (data) {
                    setid(data.id);

                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };
        loadData();
        // Cleanup function
        return () => {
            clearInterval(newIntervalId);
        };
    }, [id]);



    // user_id

    return (
        <View style={styles.conatiner}>
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.oneview}>
                        <Text style={styles.txt1}>Verification Code</Text>
                        <Text style={styles.txt2}>Enter the four digits code that we have send through the Mobile</Text>
                        <OTPTextInput
                            containerStyle={{ marginTop: '9%', }}
                            tintColor='#A60F22'
                            offTintColor='#A60F22'
                            inputCount={4}
                            handleTextChange={(enteredOTP) => setEnteredOTP(enteredOTP)}
                        />
                        {loading ?
                            <View style={styles.spinner}>
                                <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                            </View>
                            : null}
                        <View style={styles.timeview}>
                            <Image resizeMode='contain' source={require('../../../image/time.png')} style={styles.timeimg} />
                            <Text style={styles.txttime}>{formatTime(timer)}</Text>
                        </View>

                        {timer > 0 &&
                            <TouchableOpacity style={styles.btntouchble} onPress={navigateToNextScreen}>
                                <Text style={styles.btntxt}>Continue</Text>
                            </TouchableOpacity>
                        }

                        {showResend && (
                            <Text style={styles.txt3}>Dont receive the OTP?
                                <Text style={styles.txt31} onPress={handleResend}> Resend <Text style={styles.txt3}>OTP</Text> </Text>
                            </Text>
                        )}


                    </View>
                </ScrollView>
            </SafeAreaView>
            {/* <View>
                <View style={styles.line}>
                    <Text style={styles.linetxt}></Text>
                </View>
            </View> */}
        </View>
    )
}