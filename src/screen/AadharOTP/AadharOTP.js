import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert, SafeAreaView } from 'react-native'
import OTPTextInput from 'react-native-otp-textinput'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BannerAd, TestIds, MobileAds, BannerAdSize, InterstitialAd, AdEventType, AppOpenAd } from 'react-native-google-mobile-ads';
import { styles } from './styles'
import { adharotpverify } from '../API'
import { useNavigation } from '@react-navigation/core';
import { globalstyles } from '../globlestyles';

export default function AadharOTP({ route }) {
    const [loading, setLoading] = useState(false);
    const [id, setid] = useState('');
    const [nbsid, setnbsid] = useState('');
    const [userName, setUserName] = useState('');
    const [enterotp, setenterotp] = useState('');
    const { aadharnumber, request_id } = route.params || {};

    const navigation = useNavigation();

    useEffect(() => {
        // Load user name from AsyncStorage or your data source
        const loadUserName = async () => {
            const appOpenAd = AppOpenAd.createForAdRequest(TestIds.APP_OPEN, {
                keywords: ['fashion', 'clothing'],
            });

            appOpenAd.load();
            appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
                // console.log('App open ad loaded');
                appOpenAd.show();
            });
            appOpenAd.addAdEventListener(AdEventType.ERROR, (error) => {
                // console.error('App open ad failed to load: ', error);
            });


            // Create and load Interstitial Ad
            const interstitial = InterstitialAd.createForAdRequest('ca-app-pub-3940256099942544/1033173712', {
                keywords: ['fashion', 'clothing'],
            });

            // console.log('interstitial', interstitial);

            try {
                const userData = await AsyncStorage.getItem('finalRes');
                // console.log('userData', userData);

                const userDataArray = JSON.parse(userData);
                if (userDataArray) {
                    // console.log('userDataArray', userDataArray);
                    const userDataObject = userDataArray;
                    // console.log('userDataObject', userDataObject);
                    setid(userDataObject.id)
                    setUserName(userDataObject.name);
                    setnbsid(userDataObject.nbs_id)

                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };

        loadUserName();
    }, []);

    const otpsubmit = async () => {
        setLoading(true);

        const dataotp = {
            otp: enterotp,
            request_id: request_id,
            adhar_number: aadharnumber,
            user_id: id
        }
        const AdharOTP = await adharotpverify(global.URL + 'adharotpverify', dataotp)
        setLoading(false);

        console.log('UseradharOTP_verifyData-O-', AdharOTP)

        if (AdharOTP.success == true) {
            Alert.alert('Aadhar Number Successfully Verified')
            navigation.navigate('Home');
        } else {
            alert('Invalid OTP')
            console.log('----------Invalid OTP----------');
        }
    }

    return (
        <View style={styles.conatiner}>
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.oneview}>

                        <View style={{ width: '100%', backgroundColor: '#A60F22', }}>
                            <View style={styles.headdesing}></View>
                            <View style={styles.userdesingview}>
                                <View style={globalstyles.userview}>
                                    <Image source={require('../../../image/user.png')} style={globalstyles.userimg} />
                                    <Text style={globalstyles.usertxt}>{userName}</Text>
                                </View>
                                <Text style={styles.NBStxt}>NBS ID {nbsid}</Text>
                            </View>
                        </View>

                        <View style={styles.talkBubble}>
                            <View style={styles.talkBubbleSquare} ><Text style={styles.otpmsgtxt}>OTP</Text></View>
                            <View style={styles.talkBubbleTriangle} />
                        </View>

                        <Text style={styles.Verifytxt}>Verify Aadhar Card</Text>
                        {loading ?
                            <View style={styles.spinner}>
                                <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                            </View>
                            : null}
                        <View style={{ width: '90%', }}>
                            <OTPTextInput
                                containerStyle={{ marginTop: '8%', width: '100%' }}
                                textInputStyle={{ width: 30 }}
                                tintColor='#A60F22'
                                offTintColor='#A60F22'
                                inputCount={6}
                                defaultValue={enterotp}
                                handleTextChange={(text) => setenterotp(text)}
                            />
                        </View>

                        <Text style={styles.txtl1}>OTP has been sent on mobile number</Text>
                        <Text style={styles.txtl2}>Please enter OTP to verify mobile number</Text>

                    </View>
                    <View style={{ marginVertical: 20, alignSelf: 'center' }}>
                        <BannerAd
                            unitId={TestIds.BANNER}  // Using Google's test ad unit ID for banner ads
                            size={BannerAdSize.BANNER}
                            requestOptions={{
                                requestNonPersonalizedAdsOnly: true,
                            }}
                            onAdLoaded={() => {
                                console.log('Ad loaded');
                            }}
                            onAdFailedToLoad={(error) => {
                                console.error('Ad failed to load: ', error);
                            }}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
            <View style={styles.lastview}>
                <TouchableOpacity style={styles.btntouchble} onPress={otpsubmit}>
                    <Text style={styles.btntxt}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}