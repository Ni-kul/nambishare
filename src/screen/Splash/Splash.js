import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles, } from './styles'
import {
    BannerAd,
    TestIds,
    MobileAds,
    BannerAdSize,
    InterstitialAd,
    AdEventType,
    AppOpenAd
  } from 'react-native-google-mobile-ads';

  // Initialize MobileAds
MobileAds().initialize().then(adapterStatuses => {
    console.log('MobileAds initialized', adapterStatuses);
  });


export default function Splash({ navigation }) {

    const [interstitialAdLoaded, setInterstitialAdLoaded] = useState(false);

  useEffect(() => {
    // Create and load App Open Ad
    const appOpenAd = AppOpenAd.createForAdRequest(TestIds.APP_OPEN, {
      keywords: ['fashion', 'clothing'],
    });

    appOpenAd.load();
    appOpenAd.addEventListener(AdEventType.LOADED, () => {
      console.log('App open ad loaded');
      appOpenAd.show();
    });
    appOpenAd.addEventListener(AdEventType.ERROR, (error) => {
      console.error('App open ad failed to load: ', error);
    });

    // Create and load Interstitial Ad
    const interstitialAd = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
      keywords: ['fashion', 'clothing'],
    });

    interstitialAd.addEventListener(AdEventType.LOADED, () => {
      console.log('Interstitial ad loaded');
      setInterstitialAdLoaded(true);
    });

    interstitialAd.addEventListener(AdEventType.ERROR, (error) => {
      console.error('Interstitial ad failed to load: ', error);
    });

    interstitialAd.load();

    return () => {
      interstitialAd.removeAllListeners();
      appOpenAd.removeAllListeners();
    };
  }, []);

  const showInterstitialAd = () => {
    if (interstitialAdLoaded) {
      const interstitialAd = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
        keywords: ['fashion', 'clothing'],
      });
      interstitialAd.show();
      setInterstitialAdLoaded(false);
      interstitialAd.load(); // Preload next ad
    } else {
      console.log('Interstitial ad is not loaded yet');
    }
  };


    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         navigation.navigate('Splashtwo');
    //     }, 4000000);

    //     return () => clearTimeout(timer);
    // }, [navigation]);

    // useEffect(() => {
    //     const checkUserLogin = async () => {
    //         const finalRes = await AsyncStorage.getItem('finalRes');
    //         if (finalRes) {
    //             navigation.navigate('Home');
    //         } else {
    //             navigation.navigate('Splashtwo');
    //         }
    //     };

    //     const timer = setTimeout(checkUserLogin, 3000);

    //     return () => clearTimeout(timer);
    // }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../../../image/Logoopen.png')} style={styles.logoimg} />


            <View style={styles.container}>
      <Text style={styles.text}>Google Mobile Ads Example</Text>
      
      {/* Banner Ad */}
      <BannerAd
        unitId={TestIds.BANNER} // Use TestIds for testing, replace with your Ad Unit ID for production
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          console.log('Banner ad loaded');
        }}
        onAdFailedToLoad={(error) => {
          console.error('Banner ad failed to load: ', error);
        }}
      />

      {/* Interstitial Ad */}
      <Button
        title="Show Interstitial Ad"
        onPress={showInterstitialAd}
        disabled={!interstitialAdLoaded}
      />
    </View>

    
        </View>
    )
}