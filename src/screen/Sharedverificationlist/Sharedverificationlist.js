import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BannerAd, TestIds, MobileAds, BannerAdSize, InterstitialAd, AdEventType, AppOpenAd } from 'react-native-google-mobile-ads';
import { ScrollView, View, Image, Text, TextInput, BackHandler, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView } from 'react-native'
import { styles } from './styles'
import { getshared } from '../API'
import { globalstyles } from '../globlestyles';
// view

export default function Sharedverificationlist({ route }) {
    const [userName, setUserName] = useState('');
    const [sharedata, setsharedata] = useState([]);
    const [sharedataPerformed, setsharedataPerformed] = useState(false);

    const [id, setid] = useState('');
    const [nbsid, setnbsid] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    // const { type } = route.params;
    // console.log('type', type)

    // useEffect(() => {
    //     navigation.addListener('focus', () => {
    //         const loadUserData = async () => {
    //             try {
    //                 const userData = await AsyncStorage.getItem('finalRes');
    //                 // console.log('userData', userData)
    //                 const userDataArray = JSON.parse(userData);
    //                 if (userDataArray) {
    //                     // console.log('userDataArray', userDataArray);
    //                     const userDataObject = userDataArray;
    //                     // console.log('userDataObject', userDataObject);
    //                     setUserName(userDataObject.name);
    //                     setnbsid(userDataObject.nbs_id);
    //                     getshare(userDataObject.id);
    //                 }
    //             } catch (error) {
    //                 console.error('Error loading user data:', error);
    //             }
    //         };
    //         loadUserData();
    //     })
    // }, []);

    useEffect(() => {
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

        const loadUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('finalRes');
                const userDataArray = JSON.parse(userData);
                if (userDataArray) {
                    const userDataObject = userDataArray;
                    setUserName(userDataObject.name);
                    setnbsid(userDataObject.nbs_id);
                    getshare(userDataObject.id);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };

        const backAction = () => {
            // navigation.goBack();
            navigation.navigate('HomeS');
            // alert('hardwareBackPress')
            return true; // Return true to indicate that the action has been handled
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        navigation.addListener('focus', () => {
            loadUserData();
        });

        return () => {
            backHandler.remove();
        };
    }, []);


    const shareVerification = (result) => {
        // console.log('result', result)
        navigation.navigate('File', result);
    };
    const getshare = async (id) => {

        const data = {
            user_id: id,
        }
        setLoading(true);
        const getshareddata = await getshared(global.URL + 'getshared', data)
        setLoading(false);
        console.log('getshareddata--', getshareddata.data)
        if (getshareddata.success == true) {
            setsharedata(getshareddata.data)
            // console.log('User found successfully.')
        } else {
            console.log('User Not found')
        }
        setsharedataPerformed(true)
    };

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

                        {/* {type == 1 ? */}
                        <View style={{ alignItems: 'center' }}>

                            <Text style={styles.txt1}>Verification Documents</Text>
                            {/* 1  */}
                            {sharedataPerformed && sharedata.length === 0 ? (

                                <Text style={styles.txt10}>Not Shared Any Documents Yet.</Text>

                            ) : null}
                            {sharedata.length > 0 ? (
                                sharedata.map((result, index) => (
                                    <View style={styles.listview} key={index} >

                                        <View style={{ justifyContent: 'center' }}>
                                            <Image source={require('../../../image/user.png')} style={styles.listuserimg} />
                                        </View>
                                        <TouchableOpacity onPress={() => shareVerification(result)}>
                                            <View style={styles.txtmainview}>
                                                <View style={styles.nameview}>
                                                    <Text style={styles.txt2}>NAME: {result.name}</Text>

                                                    <Image source={require('../../../image/chevron.png')} style={styles.rightchevronimg} />

                                                    {/* onPress={() => getshare(result)} .split(' ')[0]*/}
                                                </View>
                                                <View style={styles.dateview}>
                                                    <Text style={styles.txt2}>NBS ID {result.nbs_id}</Text>
                                                    {result.created_at == null ?
                                                        <Text style={styles.txt3}>{result.created_at}</Text>
                                                        :
                                                        <Text style={styles.txt3}>{result.created_at.split(' ')[0]}</Text>
                                                    }
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                ))
                            ) : (
                                null
                            )}
                            {loading ?
                                <View style={styles.spinner}>
                                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                                </View>
                                : null}

                        </View>
                        {/* // : null} */}

                        {/* {type == 0 ?
                            <View>
                                <Text style={styles.txt1}>Direct Verification</Text>

                                <View style={styles.DirectVerify}>
                                    <View style={styles.Verifyimgview}>
                                        <TouchableOpacity onPress={navigateToDirectVerify}>
                                            <Image source={require('../../../image/userverificationinterfacesymbol1.png')} style={styles.Verifyimg} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.Verify}>Verify</Text>
                                </View>

                            </View> : null} */}

                        <View style={{ marginTop: 40, alignSelf: 'center' }}>
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
        </View >
    )
}

// useEffect(() => {
//     navigation.addListener('focus', () => {
//         const loadUserData = async () => {
//             try {
//                 const userData = await AsyncStorage.getItem('finalRes');
//                 // console.log('userData', userData)
//                 const userDataArray = JSON.parse(userData);
//                 if (userDataArray) {
//                     // console.log('userDataArray', userDataArray);
//                     const userDataObject = userDataArray;
//                     // console.log('userDataObject', userDataObject);
//                     setUserName(userDataObject.name);
//                     setnbsid(userDataObject.nbs_id);
//                     getshare(userDataObject.id);
//                 }
//             } catch (error) {
//                 console.error('Error loading user data:', error);
//             }
//         };
//         loadUserData();
//     })

// }, []);