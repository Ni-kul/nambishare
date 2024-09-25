import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BannerAd, TestIds, MobileAds, BannerAdSize, InterstitialAd, AdEventType, AppOpenAd } from 'react-native-google-mobile-ads';
import { ScrollView, View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView } from 'react-native'
import { styles } from './styles'
import { search } from '../API'
import { sharedetail } from '../API'
import { globalstyles } from '../globlestyles';

export default function Shareto() {
    const [id, setid] = useState('');
    const [userName, setUserName] = useState('');

    const [nbsid, setnbsid] = useState('');
    const [searchtxt, setsearchtxt] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [shareSuccess, setshareSuccess] = useState(false);

    const navigation = useNavigation();
    const navigateToFile = (result) => {
        console.log('result', result)
        navigation.navigate('File', result);
    }
    const navigateToHome = () => {
        navigation.navigate('Home');
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
                    const userDataObject = userDataArray;
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

    const Validation = async () => {
        if (searchtxt == '') {
            alert('Enter text')
        } else {
            setLoading(true);

            const data = {
                id: id,
                txt: searchtxt,
            }
            const searchdata = await search(global.URL + 'search', data)
            setLoading(false);
            console.log('searchData--', searchdata.data)
            if (searchdata.success == true) {
                setSearchResults(searchdata.data);
            } else {
                // alert('No search results')
                setSearchResults([])
            }
            setSearchPerformed(true)
        }
    }
    // const shareVerification = () => {
    //     setVerificationSuccess(true);
    // };
    const shareDoc = async (otherid) => {
        const data = {
            login_user_id: id,
            other_user_id: otherid,
        }
        setLoading(true);
        const sharedetaildata = await sharedetail(global.URL + 'sharedetail', data)
        setLoading(false);
        console.log('searchData--', sharedetaildata)
        if (sharedetaildata.success == true) {
            setshareSuccess(sharedetaildata.success)
            // Alert.alert('Successfully shared')
            // navigation.navigate('Sharedverificationlist');
        } else {
            Alert.alert('Not shared')
        }
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

                        <Text style={styles.txt1}>Share your Verification</Text>
                        <Text style={styles.txt2}>NBS ID {nbsid}</Text>

                        {/* search */}
                        {loading ?
                            <View style={styles.spinner}>
                                <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                            </View>
                            : null}
                        <View style={styles.searchview}>
                            <View style={styles.txtinputiew}>
                                <TextInput
                                    style={styles.txtinput}
                                    placeholder="Search"
                                    placeholderTextColor='#A60F22'
                                    value={searchtxt}
                                    onChangeText={(text) => setsearchtxt(text)}
                                />
                            </View>
                            <View style={styles.imgview}>
                                <TouchableOpacity onPress={Validation}>
                                    <Image source={require('../../../image/search.png')} style={styles.searchimg} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {searchPerformed && searchResults.length === 0 ? (
                            <View style={styles.NOview}>
                                <Text style={styles.txt10}>No search results available</Text>
                            </View>
                        ) : null}
                        {searchResults.length > 0 ? (
                            searchResults.map((result, index) => (
                                <View key={index}>
                                    <View style={styles.Detailsview} >
                                        <View key={index} style={{ flexDirection: 'row', width: '100%', alignItems: 'center', }}>

                                            <Image source={require('../../../image/user.png')} style={styles.user1img} />
                                            <View style={styles.Details2view}>
                                                <View style={styles.txtview}>
                                                    <Text style={styles.txt3}>{result.name}</Text>

                                                    <Text style={styles.txt3}>NBS ID {result.nbs_id}</Text>
                                                </View>
                                                {/* <TouchableOpacity onPress={() => navigateToFile(result)} style={styles.txtshare}> */}
                                                <TouchableOpacity onPress={() => shareDoc(result.id)} style={styles.txtshare}>
                                                    {/* <TouchableOpacity onPress={shareVerification} style={styles.txtshare}> */}
                                                    {/* onPress={navigateToHome} */}
                                                    <Text style={styles.txt4}>Share</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    {shareSuccess && (
                                        <View style={{ alignItems: 'center', width: '90%', alignSelf: 'center' }}>
                                            <Text style={styles.txt5}>Your Verification Details Successfully Sent to {result.name}</Text>
                                        </View>)}
                                </View>
                            ))
                        ) : (
                            null
                        )}
                        {/* {shareSuccess && (
                        <View style={{ alignItems: 'center', width: '90%' }}>
                            <Text style={styles.txt5}>Your Verification Details Successfully Sent to Raja ram</Text>
                        </View>)} */}

                    </View>
                    <View style={{ alignSelf: 'center', marginVertical: 20 }}>
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