import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect, Fragment } from 'react'
import { BannerAd, TestIds, MobileAds, BannerAdSize, InterstitialAd, AdEventType, AppOpenAd } from 'react-native-google-mobile-ads';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import { styles } from './styles'
import { globalstyles } from '../globlestyles';

export default function DashBoardHome() {

    const [id, setid] = useState('');
    const [userName, setUserName] = useState('');
    const [nbsid, setnbsid] = useState('');

    const navigation = useNavigation();
    const navigateToVerifyaadhar = () => {
        navigation.navigate('Verifyaadhar');
    }
    const navigateToVerifyPan = () => {
        navigation.navigate('VerifyPan');
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

    return (<Fragment>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#A60F22' }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }}>
                <View style={styles.constainer}>

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

                            <View style={styles.mainview}>

                                <Text style={styles.Createtxt}>Create</Text>

                                <View style={styles.Createview}>

                                    <View style={styles.adharmain}>
                                        <View style={styles.adharview}>
                                            <TouchableOpacity onPress={navigateToVerifyaadhar}>
                                                <Image source={require('../../../image/1.png')} style={styles.createuserimg} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.txt}>Aadhaar card based Trust Information</Text>
                                    </View>


                                    <View style={styles.panmain}>
                                        <View style={styles.panview}>
                                            <TouchableOpacity onPress={navigateToVerifyPan}>
                                                <Image source={require('../../../image/idcard.png')} style={styles.Newpanimg} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.txt}>PAN card based Trust Information</Text>
                                    </View>

                                </View>
                            </View>
                        </View>

                    </ScrollView >
                    <View style={{ marginBottom: 30, alignSelf: 'center' }}>
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
                </View >
            </SafeAreaView>
        </SafeAreaView>
    </Fragment>
    )
}