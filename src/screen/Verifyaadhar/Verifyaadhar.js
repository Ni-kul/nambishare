import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BannerAd, TestIds, MobileAds, BannerAdSize, InterstitialAd, AdEventType, AppOpenAd } from 'react-native-google-mobile-ads';
import { ScrollView, View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView } from 'react-native'
import { styles } from './styles'
import { adharverify } from '../API'
import { globalstyles } from '../globlestyles';

export default function Verifyaadhar() {
    const [id, setid] = useState('');
    const [userName, setUserName] = useState('');
    const [aadharnumber, setaadharnumber] = useState('');
    const [nbsid, setnbsid] = useState('');
    const [loading, setLoading] = useState(false);

    // const [requestid, setrequestid] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const loadUserData = async () => {
            const appOpenAd = AppOpenAd.createForAdRequest(TestIds.APP_OPEN, {
                keywords: ['fashion', 'clothing'],
            });

            appOpenAd.load();
            appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
                console.log('App open ad loaded');
                appOpenAd.show();
            });
            appOpenAd.addAdEventListener(AdEventType.ERROR, (error) => {
                console.error('App open ad failed to load: ', error);
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
        loadUserData();
    }, []);

    const submit = async () => {
        if (aadharnumber === '') {
            alert('Please Enter Aadhar Number.');
        }
        else {
            setLoading(true);

            const data = {
                adhar_number: aadharnumber,
                user_id: id
            };

            const AdharOTP = await adharverify(global.URL + 'adharverify', data)
            setLoading(false);

            console.log('UseradharverifyData-- V-', AdharOTP)

            // let request_id = AdharOTP.data.request_id;
            if (AdharOTP.success === true) {
                const request_id = AdharOTP.data.request_id;
                if (AdharOTP.data.result.is_otp_sent === true) {
                    alert('OTP Successfully Sent');
                    navigation.navigate('AadharOTP', { aadharnumber, request_id });
                } else {
                    alert('OTP Not Sent');
                }
            } else {
                console.log('Success -- false');
                alert('Invalid Aadhar Number');
            }

            // if (AdharOTP.data.error) {
            //     alert('Invalid aadhar number')
            // }
            // // setrequestid(AdharOTP.data.request_id)

            // let request_id = AdharOTP.data.request_id;
            // if (AdharOTP.data.result.is_otp_sent == true) {
            //     alert('OTP successfully sent');
            // } else {
            //     alert('OTP not sent');
            // }

            // if (AdharOTP.success == true) {
            //     navigation.navigate('AadharOTP', { aadharnumber, request_id });
            // } else {
            //     console.log('Success -- false');
            // }
        }
    }

    return (
        <View style={styles.container}>
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

                        <Text style={styles.txtf}>Enter Aadhaar Number</Text>
                        {/* aadhaar// lionaadhaar */}
                        <View style={styles.addarview}>
                            <View style={styles.adar1view}>
                                <Image source={require('../../../image/nationalemblem2.png')} style={styles.lionaadhaarimg} />
                                <View style={styles.lineview}>
                                    <Text style={styles.line1}></Text>
                                    <Text style={styles.line2}></Text>
                                </View>
                                <Image source={require('../../../image/aadhaar3.png')} style={styles.aadhaarimg} />
                            </View>

                            <View style={styles.adar2view}>
                                <View style={styles.imgview}>

                                    <Image source={require('../../../image/user.png')} style={styles.user1img} />
                                </View>
                                {loading ?
                                    <View style={styles.spinner}>
                                        <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                                    </View>
                                    : null}
                                <View style={styles.txtandlineview}>
                                    <Text style={styles.line3}></Text>
                                    <Text style={styles.line4}></Text>
                                    <TextInput
                                        style={styles.entertxt}
                                        value={aadharnumber}
                                        onChangeText={(text) => setaadharnumber(text)}
                                    />
                                </View>
                            </View>
                            <Text style={styles.line5}></Text>
                            <View style={styles.lineview2}>
                                <Text style={styles.line6}></Text>
                                <Text style={styles.line7}></Text>
                            </View>
                        </View>
                        <View style={styles.otptxtview}>
                            <Text style={styles.otptxt}>You will recieve an OTP with registered Aadhar mobile Number</Text>
                        </View>


                    </View>
                    <View style={{ alignSelf: 'center', marginVertical: 20 }}>
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
            <View style={styles.btn}>
                <TouchableOpacity style={styles.btnsubmit} onPress={submit}>
                    <Text style={styles.submittxt}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
