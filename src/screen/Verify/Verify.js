import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ScrollView, Image, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert, SafeAreaView } from 'react-native'
import { styles } from './styles'
import { BannerAd, TestIds, MobileAds, BannerAdSize, InterstitialAd, AdEventType, AppOpenAd } from 'react-native-google-mobile-ads';
import { mycard } from '../API'
import { globalstyles } from '../globlestyles';


export default function Verify() {
    const [nbsid, setnbsid] = useState('');
    const [userName, setUserName] = useState('');
    const [userMobile, setUserMobile] = useState('');
    const [useremail, setUseremail] = useState('');
    const [id, setid] = useState('');
    const [loading, setLoading] = useState(false);
    const [verifieddata, setverifieddata] = useState([]);
    const [verifieddatapan, setverifieddatapan] = useState([]);

    const navigation = useNavigation();
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
                // console.log('userData', userData);
                const userDataArray = JSON.parse(userData);
                if (userDataArray) {
                    // console.log('userDataArray', userDataArray);
                    const userDataObject = userDataArray;
                    // console.log('userDataObject', userDataObject);
                    setnbsid(userDataObject.nbs_id)
                    setid(userDataObject.id)
                    console.log('userDataObject.id', userDataObject.id);
                    setUserName(userDataObject.name);
                    setUserMobile(userDataObject.mobile)
                    setUseremail(userDataObject.email)
                    submit(userDataObject.id);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };
        navigation.addListener('focus', () => {
            loadUserData();
        })
    }, []);
    // Shareto
    const ToShareto = () => {
        navigation.navigate('Shareto');
    }
    const submit = async (id) => {
        setLoading(true);
        const data1 = {
            user_id: id
        };
        const detail = await mycard(global.URL + 'mycard', data1)
        // console.log('UsercartDetail--', detail)
        setLoading(false);
        if (detail.success == true) {
            if (detail.data.aadhar.length > 0) {
                setverifieddata(detail.data.aadhar);
            } else {
                console.log('Aadhar Card Not Verified');
            }
            if (detail.data.pan.length > 0) {
                setverifieddatapan(detail.data.pan)
            } else {
                console.log('Pan Card Not Verified');
            }
        } else {
            console.log('-----Data-Not-Retrieved------')
        }
    }
    const maskAadharNumber = (aadharNumber) => {
        const maskedAadhar = '**** **** ****' + aadharNumber.slice(-4);
        console.log('maskedAadhar', maskedAadhar)
        return maskedAadhar;
    };

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
                            <Text style={styles.NBStxt}>NBS ID {nbsid}</Text>
                        </View>
                    </View>

                    <View style={styles.imgview}>
                        <Image source={require('../../../image/user15.png')} style={styles.user15img} />
                    </View>

                    <Text style={styles.raghavtxt}>{userName}</Text>
                    <Text style={styles.mobileno}>Mobile Number:{userMobile}</Text>
                    <Text style={styles.email}>E-mail: {useremail}</Text>

                    {loading ?
                        <View style={styles.spinner}>
                            <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                        </View>
                        : null
                    }
                    {(verifieddata.length === 0 && verifieddatapan.length === 0) ? (
                        <Text style={styles.txt10}>Aadhar Card And PAN Card Not Verified.</Text>
                    ) : null}
                    {(verifieddata.length === 0 && verifieddatapan.length > 0) ? (
                        <Text style={styles.txt10}>Aadhar Card Not Verified.</Text>
                    ) : null}
                    {verifieddata.length > 0 ? (
                        verifieddata.map((result, index) => (
                            <View key={index}>
                                <View style={styles.addarview} >
                                    <View style={styles.adar1view}>
                                        <Image source={require('../../../image/nationalemblem2.png')} style={styles.lionaadhaarimg} />
                                        <Text style={styles.txt1}>GOVT. OF INDIA</Text>
                                        {result.image != '' ?
                                            <View>
                                                <Image source={{ uri: 'data:image/png;base64,' + result.image }} style={styles.aadhaarimg} />
                                            </View>
                                            : <Image source={require('../../../image/aadhaar3.png')} style={styles.aadhaarimg} />}

                                    </View>
                                    <View style={styles.addressview}>
                                        <Text style={styles.txt2}>Aadhar details : </Text>
                                        <Text style={styles.anametxt1}>{result.name}</Text>
                                    </View>
                                    <View style={styles.addressview}>
                                        <Text style={styles.txt22}>Aadhar number: </Text>
                                        <Text style={styles.anametxt}>**** **** ****{result.aadhar_number.slice(-4)}</Text>

                                    </View>

                                    <View style={styles.addressview}>
                                        <Text style={styles.txt222}>Name: </Text>
                                        <Text style={styles.anametxt2}>{result.name}</Text>
                                    </View>

                                    <View style={styles.addressview}>
                                        <Text style={styles.txt22to}>Address: </Text>
                                        <Text style={styles.txt3}>{result.address}</Text>
                                    </View>

                                </View>
                                <Text style={styles.txt4}><Text style={styles.txt5}>Verified</Text> on {result.created_date.split(' ')[0]}</Text>
                            </View>
                        ))
                    ) : (
                        null
                    )}

                    {(verifieddata.length > 0 && verifieddatapan.length === 0) ? (
                        <Text style={styles.txt10}>PAN Card Not Verified.</Text>
                    ) : null}

                    {verifieddatapan.length > 0 ? (
                        verifieddatapan.map((result, index) => (
                            <View key={index}>
                                <View style={styles.panview}>
                                    <View style={styles.pan1view}>
                                        <Text style={styles.txtpan1}>INCOME TAX DEPERTMENT</Text>
                                        <Image source={require('../../../image/nationalemblem2.png')} style={styles.lionaadhaarimg} />
                                        <Text style={styles.txtpan2}>GOVT. OF INDIA</Text>
                                    </View>
                                    <View style={styles.nameview}>
                                        <Text style={styles.txtpan3}>Pan details  : </Text>
                                        <Text style={styles.txtpan33}>{result.name}</Text>
                                    </View>
                                    <Text style={styles.txtpan41}>Pan number :**** ***{result.pan_number.slice(-3)}</Text>
                                    <Text style={styles.txtpan4}>DOB: </Text>
                                </View>
                                <Text style={styles.txt4}><Text style={styles.txt5}>Verified</Text> on {result.created_date.split(' ')[0]}</Text>
                            </View>
                        ))
                    ) : (
                        null
                    )}
                </View>
                <View style={{ marginBottom: 20, alignSelf: 'center' }}>
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

            {verifieddata.length > 0 ?
                <View style={styles.lastview}>
                    <TouchableOpacity style={styles.btnsubmit} onPress={ToShareto}>
                        <Text style={styles.submittxt}>Share Trust infromation</Text>
                    </TouchableOpacity>
                </View>
                :
                null
            }
        </View>
    </SafeAreaView>
    )
}