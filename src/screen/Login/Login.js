import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react'
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native'
// import CheckBox from 'expo-checkbox';
import CheckBox from '@react-native-community/checkbox';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles'
import { login } from '../API';

export default function Login() {

    const [Selected, setSelected] = useState();
    const [Mobile, setmobile] = useState();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    function TC() {
        navigation.navigate('TandC');
    }

    function mobilenumber() {
        if (!Mobile) {
            alert('Please enter a mobile number');
        }
        else if (!/^\d+$/.test(Mobile)) {
            alert('Mobile number should contain only numbers');
        }
        else if (Mobile.length !== 10) {
            // else if (Mobile.length < 8 || Mobile.length > 10) {
            alert('Mobile number should be exactly 10 digits');
        }
        // else if (Mobile !== '987654321') {
        //     alert('You ente a wrong mobile number');
        // }
        else if (!Selected) {
            alert('Please agree to the Terms & Conditions');
        }
        else {
            setLoading(true);
            const data = {
                mobile: Mobile,
            };
            login(global.URL + 'login', data).then((res) => {
                // console.log('*******login data', res.data[0])
                setLoading(false);

                if (res.success == true) {
                    navigation.navigate('LoginOTP', res.data[0]);
                } else {
                    console.log('----------error----------');
                    // alert('You ente a wrong mobile number');
                }
            })
        }
    }


    return (
        <View style={styles.container}>
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.fview}>
                        <Image source={require('../../../image/Logotwo.png')} style={styles.logoimg} />
                        <Text style={styles.logtxt}>Log In / Sign In</Text>
                        <Text style={styles.line}></Text>
                        <Text style={styles.mobiletxt}>Mobile Number</Text>
                        {/* */}
                        <View style={styles.callview}>
                            <Image source={require('../../../image/call.png')} style={styles.callimg} />
                            <TextInput
                                style={styles.inputtxt}
                                keyboardType="numeric"
                                maxLength={10}
                                onChangeText={(Mobile) => setmobile(Mobile)}
                            />
                        </View>
                        {loading ?
                            <View style={styles.spinner}>
                                <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                            </View>
                            : null}
                        <Text style={styles.line2}></Text>
                        {/* <View style={styles.checkboxview}>
                        <CheckBox
                            style={styles.check}
                            value={Selected}
                            onValueChange={setSelected}
                            // color={'#A60F22'}
                            tintColors={{
                                false: '#A60F22',
                                true: '#A60F22'
                            }}
                        />
                        <Text style={styles.checktxt}>I agree to the Terms & condition</Text>
                    </View> */}
                    </View>
                </ScrollView>

                {/* <View style={styles.zIndexContainer}>
                <Image source={require('../../../image/loginimg.png')} style={styles.loginimg} />
                <View style={styles.checkboxview}>
                    <CheckBox
                        style={styles.check}
                        value={Selected}
                        onValueChange={setSelected}
                        // color={'#A60F22'}
                        tintColors={{
                            false: '#A60F22',
                            true: '#A60F22'
                        }}
                    />
                    <Text style={styles.checktxt}>I agree to the Terms & condition</Text>
                </View>
                <View style={styles.lastviewtwo}>
                    <TouchableOpacity onPress={mobilenumber}>
                        <Text style={styles.logintxt}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View> */}

                {/* ------------------------------------------old */}
                <View style={{ backgroundColor: '#85B34F', height: 'auto' }}>
                    <View style={styles.lastview}>
                        <View style={styles.lastviewone}>
                        </View>
                        <View style={styles.checkboxview}>
                            <CheckBox
                                style={styles.check}
                                value={Selected}
                                onValueChange={setSelected}
                                // color={'#A60F22'}
                                tintColors={{
                                    false: '#A60F22',
                                    true: '#A60F22'
                                }}
                            />
                            <TouchableOpacity onPress={TC}>
                                <Text style={styles.checktxt}>I agree to the Terms & Conditions</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.lastviewtwo}>
                            <TouchableOpacity onPress={mobilenumber}>
                                <Text style={styles.logintxt}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* ------------------------------------------ */}
            </SafeAreaView>
        </View>

    )
}