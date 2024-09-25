import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import OTPTextInput from 'react-native-otp-textinput'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BannerAd, TestIds, MobileAds, BannerAdSize, InterstitialAd, AdEventType, AppOpenAd } from 'react-native-google-mobile-ads';
import { styles } from './styles'
import { globalstyles } from '../globlestyles';
export default function Directpanotp({ navigation }) {
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
            navigation.navigate('Directpanview');
        }, 4000);
        return () => clearTimeout(timer);
    }, [navigation]);

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



                        <Text style={styles.EnterOTPtxt}>Enter OTP</Text>

                        <View style={styles.talkBubble}>
                            <View style={styles.talkBubbleSquare} ><Text style={styles.otpmsgtxt}>OTP</Text></View>
                            <View style={styles.talkBubbleTriangle} />
                        </View>

                        <Text style={styles.Verifytxt}>Verify Pan Card</Text>
                        <OTPTextInput
                            containerStyle={{ marginTop: '8%', width: '70%' }}
                            tintColor='#A60F22'
                            offTintColor='#A60F22'
                            inputCount={4}
                        />
                        <Text style={styles.txtl1}>OTP has been sent on mobile number</Text>
                        <Text style={styles.txtl2}>Please enter OTP to verify mobile number</Text>

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
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}