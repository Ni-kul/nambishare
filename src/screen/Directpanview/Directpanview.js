// Directpanview
import React, { useEffect, useState } from 'react'
import { View, ScrollView, Image, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native'
import { styles } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BannerAd, TestIds, MobileAds, BannerAdSize, InterstitialAd, AdEventType, AppOpenAd } from 'react-native-google-mobile-ads';
import { globalstyles } from '../globlestyles';
export default function Directpanview({ navigation }) {
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
                    setUserName(userDataObject.name);
                    setid(userDataObject.id)
                    // console.log('userDataObject.id', userDataObject.id);
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

                        <View style={styles.panview}>

                            <View style={styles.pan1view}>
                                <Text style={styles.txtpan1}>INCOME TAX DEPERTMENT</Text>
                                <Image source={require('../../../image/lionaadhaar.png')} style={styles.lionaadhaarimg} />
                                <Text style={styles.txtpan2}>GOVT. OF INDIA</Text>
                            </View>

                            <Text style={styles.txtpan3}>Pan details :</Text>
                            <Text style={styles.txtpan3}>Pan number : ****23P</Text>
                            <Text style={styles.txtpan4}>DOB: 20/10/2000</Text>
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