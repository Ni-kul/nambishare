import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BannerAd, TestIds, MobileAds, BannerAdSize, InterstitialAd, AdEventType, AppOpenAd } from 'react-native-google-mobile-ads';
import { View, ScrollView, Image, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native'
import { styles } from './styles'
import { globalstyles } from '../globlestyles';


export default function DirectAaverifyview({ navigation }) {
    const [userName, setUserName] = useState('');
    const [id, setid] = useState('');
    const [nbsid, setnbsid] = useState('');

    useEffect(() => {
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
                const userDataArray = JSON.parse(userData);
                if (userDataArray) {
                    const userDataObject = userDataArray;
                    // const name = userDataObject.name;
                    setUserName(userDataObject.name);
                    setid(userDataObject.id)
                    console.log('userDataObject.id-', userDataObject.id);
                    setnbsid(userDataObject.nbs_id)

                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };
        loadUserName();
        const timer = setTimeout(() => {
            navigation.navigate('DirectVerify');
        }, 4000);
        return () => clearTimeout(timer);
    }, [navigation]);
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

                        <View style={styles.addarview}>
                            <View style={styles.adar1view}>
                                <Image source={require('../../../image/lionaadhaar.png')} style={styles.lionaadhaarimg} />
                                <Text style={styles.txt1}>GOVT. OF INDIA</Text>
                                <Image source={require('../../../image/aadhaar.png')} style={styles.aadhaarimg} />
                            </View>
                            <Text style={styles.txt2}>Aadhar details : </Text>
                            <Text style={styles.txt2}>Aadhar number: **** **** 8909</Text>
                            <Text style={styles.txt2}>Name: Babu Kannan</Text>
                            <View style={styles.addressview}>
                                <Text style={styles.txt2}>Address: </Text>
                                <Text style={styles.txt3}>735 Sunset Ave West mambalam , Chennai</Text>
                            </View>
                        </View>

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
        </View>
    )
}