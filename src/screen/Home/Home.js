import { useNavigation, useIsFocused } from '@react-navigation/core';
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, BackHandler, ActivityIndicator, SafeAreaView, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BannerAd, TestIds, MobileAds, BannerAdSize, InterstitialAd, AdEventType, AppOpenAd } from 'react-native-google-mobile-ads';
// AppOpenAd,  AdEventType, 
import { styles } from './styles'
import { mycard } from '../API';
import { globalstyles } from '../globlestyles';

export default function Home() {

    const [userName, setUserName] = useState('');
    // nbs_id
    const [nbsid, setnbsid] = useState('');
    const [id, setid] = useState('');
    const [loading, setLoading] = useState(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        // MobileAds().initialize();

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
                    setnbsid(userDataObject.nbs_id)
                    setid(userDataObject.id)
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };
        // navigation.addListener('focus', () => {
        //     loadUserData();
        // })
        const handleBackButton = () => {
            if (isFocused) {  // Check if the Home screen is focused
                BackHandler.exitApp();
                return true;
            }
            return false; // Allow default behavior for other screens
        };

        if (isFocused) {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
            loadUserData();
        }

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };


    }, [isFocused]);

    const navigation = useNavigation();
    const navigateToVerifyaadhar = () => {
        navigation.navigate('DashBoardHome');
    }
    // navigation.goBack();
    // const navigateToVerificationviewself = () => {
    //     navigation.navigate('Verificationviewself');
    // }
    // ----------------------------Verifyviewothers / Validate
    const navigateToVerificationviewother = () => {
        navigation.navigate('Sharedverificationlist', { type: 1 });
    }

    const checkfun = async () => {
        setLoading(true);

        const data1 = {
            user_id: id
        };

        try {
            const detail = await mycard(global.URL + 'mycard', data1);
            // console.log('UsercartDetail--', detail);
            setLoading(false);

            if (detail.success === true) {
                // console.log('aadhar:', detail.data.aadhar);
                // console.log('pan:', detail.data.pan);
                if (
                    (detail.data.aadhar && detail.data.aadhar.length === 0) &&
                    (detail.data.pan && detail.data.pan.length === 0)
                ) {
                    alert('Please Verify Both Aadhar And Pan Card To Share Your Details.');
                    navigation.navigate('DashBoardHome');
                    // navigation.navigate('Share');
                } else if (detail.data.aadhar && detail.data.aadhar.length === 0) {
                    alert('Please Verify Aadhar Card To Share Your Details.');
                    navigation.navigate('DashBoardHome');
                }
                else if (detail.data.pan && detail.data.pan.length === 0) {
                    alert('Please Verify Pan Card To Share Your Details.');
                    navigation.navigate('DashBoardHome');
                }
                else {
                    navigation.navigate('Share');
                }
            } else {
                console.error('false:');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const navigateToDirectVerify = () => {
        // navigation.navigate('Sharedverificationlist');
        navigation.navigate('DirectVerify', { type: 0 });
    }
    // 




    return (<SafeAreaView style={{ flex: 1, backgroundColor: '#A60F22' }}>
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.oneview}>
                    <View style={{ width: '100%', backgroundColor: '#A60F22', }}>
                        <View style={styles.headdesing}></View>
                        <View style={styles.userdesingview}>
                            <View style={globalstyles.userview}>
                                <Image source={require('../../../image/user.png')} style={globalstyles.userimg} />
                                <Text style={globalstyles.usertxt}>{userName}</Text>
                            </View>
                            <View style={styles.viewnbs}>
                                <Text style={styles.NBStxt}>NBS ID {nbsid}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ width: '88%' }}>
                        <Text style={styles.Createtxt}>Create</Text>

                        <View style={styles.createuserview}>

                            <View style={{ width: '40%' }}>
                                <View style={styles.createuser1view}>
                                    <TouchableOpacity onPress={navigateToVerifyaadhar}>
                                        <Image source={require('../../../image/1.png')} style={styles.createuserimg} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.AadharCardtxt}>Create Trust Information</Text>
                            </View>
                            <Text style={styles.createusertxt}>Create verified Trust Information to share with others.</Text>
                        </View>

                        <Text style={styles.Sharetxt}>Share</Text>

                        <View style={styles.shareview}>
                            <View style={{ width: '40%' }}>
                                <View style={styles.shareimgview}>
                                    <TouchableOpacity onPress={checkfun}>
                                        {/* onPress={navigateToShareto} */}
                                        <Image source={require('../../../image/approval1.png')} style={styles.shareimg} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.ShareDoctxt}>Share Trust Information</Text>
                            </View>
                            <Text style={styles.Sharetxt2}>Share Trust Information safely and securely with others.</Text>
                        </View>

                        <Text style={styles.Validatetxt}>View</Text>
                        {loading ?
                            <View style={styles.spinner}>
                                <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                            </View>
                            : null
                        }
                        <View style={styles.Validateview}>
                            <View style={{ width: '40%' }}>
                                <View style={styles.Validateimgview}>
                                    <TouchableOpacity onPress={navigateToVerificationviewother}>
                                        <Image source={require('../../../image/userverificationinterfacesymbol1.png')} style={styles.Validateimg} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.Validatetxt2}>View validated Trust Information</Text>
                            </View>
                            <Text style={styles.Sharetxt2}>View validated Trust Information provided by others.</Text>
                        </View>
                        {/* / userverification.png */}

                        <Text style={styles.Validatetxt}>Verify</Text>

                        <View style={styles.Validateview}>
                            <View style={{ width: '40%' }}>
                                <View style={styles.Validateimgview}>
                                    <TouchableOpacity onPress={navigateToDirectVerify}>
                                        <Image source={require('../../../image/userverificationinterfacesymbol1.png')} style={styles.Validateimg} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.Verify1}>Verify Trust Information</Text>
                            </View>

                            <Text style={styles.Sharetxt2}>Verify credentials provided by others.</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 30 }}>
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

        </View>
    </SafeAreaView>
    )
}


// other pan detail show verify ?
//  share verification not working ?
// static text ?