import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BannerAd, TestIds, MobileAds, BannerAdSize, InterstitialAd, AdEventType, AppOpenAd } from 'react-native-google-mobile-ads';
import { ScrollView, View, Image, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import { styles } from './styles'
import { adharverify } from '../API'
import { panverify } from '../API'
import { globalstyles } from '../globlestyles';

export default function DirectVerify() {
    const [userName, setUserName] = useState('');
    const [id, setid] = useState('');
    const [nbsid, setnbsid] = useState('');
    const [aadharnumber, setaadharnumber] = useState('');
    const [pan, setpan] = useState('');


    const navigation = useNavigation();

    // const navigateToDIrectaadharOTP = async () => {
    //     if (aadharno == '') {
    //         alert('Please eneter your aadhar number');
    //     } else {
    //         const data = {
    //             adhar_number: aadharno,
    //             user_id: id
    //         };
    //         const AdharOTP = await adharverify(global.URL + 'adharverify', data)
    //         console.log('UseradharverifyData-- V-', AdharOTP.data)
    //         // setrequestid(AdharOTP.data.request_id)
    //         if (AdharOTP.success == true) {
    //             navigation.navigate('AadharOTP', { aadharnumber, request_id });
    //         } else {
    //             console.log('Success -- false');
    //             alert('Invalid aadhar number')
    //         }
    //         let request_id = AdharOTP.data.request_id;
    //         if (AdharOTP.data.result.is_otp_sent == true) {
    //             alert('OTP successfully sent');
    //         } else {
    //             alert('OTP not sent');
    //         }
    //     }
    //     //navigation.navigate('DIrectaadharOTP');
    // }
    const navigateToDIrectaadharOTP = async () => {
        try {
            if (aadharnumber === '') {
                alert('Please enter your Aadhar number');
            } else {
                const data = {
                    adhar_number: aadharnumber,
                    user_id: id
                };
                const AdharOTP = await adharverify(global.URL + 'adharverify', data);
                console.log('UseradharverifyData-- V-', AdharOTP.data);

                if (AdharOTP.success === true) {
                    const request_id = AdharOTP.data.request_id;
                    if (AdharOTP.data.result.is_otp_sent === true) {
                        alert('OTP successfully sent');
                        navigation.navigate('AadharOTP', { aadharnumber, request_id });
                    } else {
                        alert('OTP not sent');
                    }
                } else {
                    console.log('Success -- false');
                    alert('Invalid Aadhar number');
                }
            }
        } catch (error) {
            console.error('Error in navigating to Aadhar OTP:', error);
        }
    };

    const navigateToDirectpanotp = async () => {
        try {
            if (pan == '') {
                alert('Please eneter your pan number');
            } else {
                const panData = {
                    pan_number: pan,
                    user_id: id
                };
                const panVerificationResult = await panverify(global.URL + 'panverify', panData)

                if (panVerificationResult.success == true) {
                    alert('PAN Number Successfully Verified');
                } else {
                    alert('Invalid PAN Number');
                }
                console.log('UserPanData--', panData)
            }
        } catch (error) {
            console.error('Error in navigating to Pan OTP:', error);
        }

        //navigation.navigate('Directpanotp');
    }
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
                const userDataArray = JSON.parse(userData);
                if (userDataArray) {
                    // console.log('userDataArray', userDataArray);
                    const userDataObject = userDataArray;
                    // console.log('userDataObject', userDataObject);
                    setUserName(userDataObject.name);
                    setid(userDataObject.id)
                    // console.log('userDataObject.id', userDataObject.id);
                    setnbsid(userDataObject.nbs_id)
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };
        loadUserData();
    }, []);
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


                        {/* Verify Aadhar */}
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
                                <View style={styles.txtandlineview}>
                                    <Text style={styles.line3}></Text>
                                    <Text style={styles.line4}></Text>
                                    <TextInput
                                        style={styles.entertx}
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
                        <Text style={styles.adarotptxt}>You will recieve an OTP with registered Aadhar mobile Number</Text>
                        <TouchableOpacity style={styles.btnAadhar} onPress={() => navigateToDIrectaadharOTP()}>
                            <Text style={styles.Aadhartxt}>Verify Aadhar</Text>
                        </TouchableOpacity>
                        {/* Verify Pan */}
                        <View style={styles.panview}>

                            <View style={styles.pan1view}>
                                <Text style={styles.txtpan1}>INCOME TAX DEPERTMENT</Text>
                                <Image source={require('../../../image/nationalemblem2.png')} style={styles.lionaadhaarimg} />
                                <Text style={styles.txtpan2}>GOVT. OF INDIA</Text>
                            </View>

                            <View style={styles.pandetailview}>
                                <View style={styles.panimgview}>
                                    <Image source={require('../../../image/user.png')} style={styles.panuser1img} />
                                </View>
                                <View style={styles.pantxtinputview}>
                                    <Text style={styles.txtpan3}>e - Permanent Account Number Card</Text>
                                    <TextInput
                                        style={styles.entertxt1}
                                        value={pan}
                                        onChangeText={(text) => setpan(text)}
                                    />
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.btnAadhar} onPress={() => navigateToDirectpanotp()} >
                            <Text style={styles.Aadhartxt}>Verify Pan</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignSelf: 'center', marginBottom: 20 }}>
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
        </View>
    )
}