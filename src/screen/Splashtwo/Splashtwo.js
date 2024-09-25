import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    BannerAd,
    TestIds,
    MobileAds,
    BannerAdSize,
    InterstitialAd,
    AdEventType,
    AppOpenAd
} from 'react-native-google-mobile-ads';
import { styles } from './styles'
// Initialize MobileAds
// MobileAds().initialize().then(adapterStatuses => {
//     console.log('MobileAds initialized', adapterStatuses);
// });

const Splashtwo = ({ navigation }) => {
    // const [interstitialAd, setInterstitialAd] = useState(null);

    useEffect(() => {

        // const appOpenAd = AppOpenAd.createForAdRequest(TestIds.APP_OPEN, {
        //     keywords: ['fashion', 'clothing'],
        // });

        // appOpenAd.load();
        // appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
        //     console.log('App open ad loaded');
        //     appOpenAd.show();
        // });
        // appOpenAd.addAdEventListener(AdEventType.ERROR, (error) => {
        //     console.error('App open ad failed to load: ', error);
        // });


        // // Create and load Interstitial Ad
        // const interstitial = InterstitialAd.createForAdRequest('ca-app-pub-3940256099942544/1033173712', {
        //     keywords: ['fashion', 'clothing'],
        // });

        // console.log('interstitial', interstitial);







        // interstitial.addAdEventListener(AdEventType.LOADED, () => {
        //   console.log('Interstitial ad loaded');
        //   setInterstitialAd(interstitial);
        // });

        // interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
        //   console.error('Interstitial ad failed to load: ', error);
        // });

        // interstitial.load();

        // return () => {
        //   interstitial.removeAllListeners();
        //   appOpenAd.removeAllListeners();
        // };


        navigation.addListener('focus', () => {

            const checkUserLogin = async () => {
                const finalRes = await AsyncStorage.getItem('finalRes');
                // console.log('finalRes--', finalRes)
                if (finalRes) {
                    navigation.navigate('Home');
                } else {
                    navigation.navigate('Login');
                }
            };
            const timer = setTimeout(checkUserLogin, 1000);

            return () => clearTimeout(timer);

        })
    }, []);

    const showInterstitialAd = () => {
        if (interstitialAd) {
            interstitialAd.show();
            setInterstitialAd(null);
            // Preload next ad
            const newInterstitial = InterstitialAd.createForAdRequest('ca-app-pub-3940256099942544/1033173712', {
                keywords: ['fashion', 'clothing'],
            });

            newInterstitial.addAdEventListener(AdEventType.LOADED, () => {
                console.log('New interstitial ad loaded');
                setInterstitialAd(newInterstitial);
            });

            newInterstitial.addAdEventListener(AdEventType.ERROR, (error) => {
                console.error('New interstitial ad failed to load: ', error);
            });

            newInterstitial.load();
        } else {
            console.log('Interstitial ad is not loaded yet');
        }
    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.text}>Google Mobile Ads Example</Text> */}

            <Image source={require('../../../image/homem.png')} style={styles.userimg} />

            {/* Interstitial Ad */}
            {/* <Button
                title="Show Interstitial Ad"
                onPress={showInterstitialAd}
                disabled={!interstitialAd}
            /> */}
        </View>
    );
};

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     text: {
//         marginBottom: 20,
//     },
// });

export default Splashtwo;
