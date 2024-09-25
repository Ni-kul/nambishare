import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BannerAd, TestIds, MobileAds, BannerAdSize, InterstitialAd, AdEventType, AppOpenAd } from 'react-native-google-mobile-ads';
import { ScrollView, View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native'
import { styles } from './styles'
import { panverify } from '../API'
import { globalstyles } from '../globlestyles';

export default function VerifyPan() {
    const [userName, setUserName] = useState('');
    const [pannumber, setpannumber] = useState('');
    const [id, setid] = useState('');
    const [nbsid, setnbsid] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    // const navigateToPanOTP = () => {
    // }
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
                    setnbsid(userDataObject.nbs_id)

                }

            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };
        loadUserData();
    }, []);

    const submit = async () => {
        if (pannumber === '') {
            alert('Please enter Pan Number.');
        } else {
            setLoading(true);
            const data = {
                pan_number: pannumber,
                user_id: id
            };

            const pan = await panverify(global.URL + 'panverify', data)
            setLoading(false);

            if (pan.success == true) {
                alert('PAN Number Successfully Verified');
            } else {
                alert('Invalid PAN Number');
            }
            console.log('UserPanData--', data)
        }
        // navigation.navigate('PanOTP');
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

                        <Text style={styles.txtf}>Enter Pan Number</Text>

                        {/* aadhaar// lionaadhaar */}
                        <View style={styles.panview}>

                            <View style={styles.pan1view}>
                                <Text style={styles.txtpan1}>INCOME TAX DEPERTMENT</Text>
                                <Image source={require('../../../image/nationalemblem2.png')} style={styles.lionaadhaarimg} />
                                <Text style={styles.txtpan2}>GOVT. OF INDIA</Text>
                            </View>
                            {loading ?
                                <View style={styles.spinner}>
                                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                                </View>
                                : null}
                            <View style={styles.pandetailview}>
                                <View style={styles.panimgview}>
                                    <Image source={require('../../../image/user.png')} style={styles.panuser1img} />
                                </View>
                                <View style={styles.pantxtinputview}>
                                    <Text style={styles.txtpan3}>e - Permanent Account Number Card</Text>
                                    <TextInput
                                        style={styles.entertxt}
                                        value={pannumber}
                                        onChangeText={(text) => setpannumber(text)}
                                    />
                                </View>
                            </View>

                        </View>
                        {/* <View style={styles.otptxtview}>
                        <Text style={styles.otptxt}>You will recieve an OTP with registered Aadhar mobile Number</Text>
                    </View> */}

                    </View>
                    <View style={{ alignSelf: 'center', marginTop: 30 }}>
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
