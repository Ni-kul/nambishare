// File
// Verificationviewself
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BannerAd, TestIds, MobileAds, BannerAdSize, InterstitialAd, AdEventType, AppOpenAd } from 'react-native-google-mobile-ads';
import { View, ScrollView, Image, Text, TouchableOpacity, Linking, TextInput, ActivityIndicator, SafeAreaView, BackHandler } from 'react-native'
import { styles } from './styles'
import { mycard } from '../API'
import { globalstyles } from '../globlestyles';

export default function File({ route }) {
    const [userName, setUserName] = useState('');
    const [nbs_id, setnbsid] = useState('');
    const [adharname, setadharname] = useState('');
    const [adharimage, setadharimage] = useState('');
    const [adhar_number, setadhar_number] = useState('');
    const [AdharDate, setAdharDate] = useState('');
    const [Adharaddress, setAdharaddress] = useState('');
    const [DOB, setDOB] = useState('');
    const [panname, setpanname] = useState('');
    const [pan_number, setpan_number] = useState('');
    const [Date, setDate] = useState('');
    const [dob, setdob] = useState('');
    const [name, setname] = useState('');
    const [mobile, setmobile] = useState('');
    const [email, setemail] = useState('');
    const [loading, setLoading] = useState(false);
    const [getData, setgetData] = useState('');
    const [pangetData, setpangetData] = useState('');
    const [userid, setuserid] = useState('');
    const [ispdf, setispdf] = useState('');
    const [profile_image, setprofile_image] = useState('');
    const [passid, setpassid] = useState('');

    const navigation = useNavigation();

    // useEffect(() => {
    //     navigation.addListener('focus', () => {
    //         const loadUserName = async () => {
    //             try {
    //                 const userData = await AsyncStorage.getItem('finalRes');
    //                 const userDataArray = JSON.parse(userData);
    //                 if (userDataArray) {
    //                     const userDataObject = userDataArray;
    //                     console.log('userDataObject',userDataObject)
    //                     setuserid(userDataObject.id)
    //                 }
    //             } catch (error) {
    //                 console.error('Error loading user data:', error);
    //             }
    //         };
    //         loadUserName();
    //         // const focusListener = navigation.addListener('focus', loadUserName);
    //         // return () => focusListener(); 
    //     })
    // });

    // useEffect(() => {
    //     alert('data -- 11')
    //     const loadUserName = async () => {
    //         try {
    //             const userData = await AsyncStorage.getItem('finalRes');
    //             const userDataArray = JSON.parse(userData);
    //             if (userDataArray) {
    //                 const userDataObject = userDataArray;
    //                 setuserid(userDataObject.id);
    //             }
    //         } catch (error) {
    //             console.error('Error loading user data:', error);
    //         }
    //     };

    //     const backAction = () => {
    //         //   navigation.navigate('Sharedverificationlist'); // Navigate to the desired screen
    //         navigation.goBack();
    //         return true; // Return true to indicate that the back action has been handled
    //     };

    //     const backHandler = BackHandler.addEventListener(
    //         'hardwareBackPress',
    //         backAction
    //     );

    //     navigation.addListener('focus', () => {
    //         loadUserName();
    //     });

    //     return () => {
    //         backHandler.remove();
    //         // focusListener.remove();
    //     };
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
        // navigation.addListener('focus', () => {
        const focusListener = () => {

            const data = route.params;
            if (data) {
                submit(data.id);
                setpassid(data.id)
                setname(data.name);
                setmobile(data.mobile);
                setemail(data.email);
                setnbsid(data.nbs_id);
            } else {
                navigation.navigate('Sharedverificationlist')
                // console.log('Data --> undefined');
            }
        }
        navigation.addListener('focus', focusListener);

        return () => {
            navigation.removeListener('focus', focusListener);
        };
        // });

    }, [route.params]);

    const downloadPdf = async () => {

        try {
            setLoading(true);
            const viewuserdata = route.params;
            // console.log('viewuserdata--pdf', viewuserdata)
            const response = await fetch('http://www.app.nambishaer.com/admin/public/api/downloadpdf?id=' + viewuserdata.id);
            const dataview = await response.json();
            setLoading(false);

            if (dataview.path) {
                // console.log('PDF Path:', dataview.path);
                // setispdf(dataview.path)
                viewpdf(dataview.path);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const viewpdf = (path) => {
        // console.log('path-->',path)
        const urlopen = 'http://www.app.nambishaer.com/admin/public/' + path;
        // console.log('urlopen =>> ', urlopen)
        Linking.openURL(urlopen)
    }

    const submit = async (id) => {

        setLoading(true);
        const data1 = {
            user_id: id
        };
        // console.log('--data1111-', data1)

        const detail = await mycard(global.URL + 'mycard', data1)
        // console.log('UserDetail--', detail.data.aadhar.length)
        setLoading(false);
        setgetData(detail.data.aadhar.length)
        let isshow = 0;

        if (detail.data.profile_image) {
            setprofile_image(detail.data.profile_image);
        }

        if (detail.data.aadhar.length > 0) {
            isshow = 1;

            setadhar_number(detail.data.aadhar[0].aadhar_number)
            setadharname(detail.data.aadhar[0].name)
            setAdharaddress(detail.data.aadhar[0].address)
            setDOB(detail.data.aadhar[0].dob)

            setadharimage(detail.data.aadhar[0].image);
            const createdDate1 = detail.data.aadhar[0].created_date;
            const datePart1 = createdDate1.split(' ')[0];
            setAdharDate(datePart1);
        } else {
            // setadhar_number('')
            // setadharname('')
            // setAdharDate('')
            // setAdharaddress('')
            console.log('Aadhar card not verified');
        }
        setpangetData(detail.data.pan.length);
        if (detail.data.pan.length > 0) {
            isshow = 1;
            // console.log('pan detail:-', detail.data.pan[0]);
            setpan_number(detail.data.pan[0].pan_number)
            setpanname(detail.data.pan[0].name)
            // setdob(detail.data.pan[0].dob)
            const createdDate = detail.data.pan[0].created_date;
            const datePart = createdDate.split(' ')[0];
            setDate(datePart);
        } else {
            // setpan_number('')
            // setpanname('')
            // // setdob('')
            // setDate('')
            console.log('PAN card not verified');
        }
        if (isshow == 0) {
            alert('No any verified data to show');
        }
    }

    return (<SafeAreaView style={{ flex: 1, backgroundColor: '#A60F22' }}>
        <View style={styles.container}>

            <ScrollView>
                <View style={styles.oneview}>

                    <View style={{ width: '100%', backgroundColor: '#A60F22', }}>
                        <View style={styles.headdesing}></View>
                        <View style={styles.userdesingview}>
                            <View style={globalstyles.userview}>
                                <Image source={require('../../../image/user.png')} style={globalstyles.userimg} />
                                <Text style={globalstyles.usertxt}>{name}</Text>
                            </View>
                            <Text style={styles.NBStxt}>NBS ID {nbs_id}</Text>
                        </View>
                    </View>
                    <View style={styles.imgview}>
                        {profile_image != '' ?
                            <Image source={{ uri: 'http://www.app.nambishaer.com/admin/public/images/' + profile_image }} style={styles.user15img} />
                            :

                            <Image source={require('../../../image/user.png')} style={styles.user15img} />
                        }

                    </View>

                    {/* <View> */}
                    <Text style={styles.raghavtxt}>{name}</Text>
                    <Text style={styles.mobileno}>Mobile Number: {mobile}</Text>
                    <Text style={styles.email}>E-mail: {email}</Text>
                    {/* </View> */}
                    {loading ?
                        <View style={styles.spinner}>
                            <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                        </View>
                        : null}
                    {getData > 0 &&
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <View style={styles.addarview}>
                                <View style={styles.adar1view}>
                                    <Image source={require('../../../image/nationalemblem2.png')} style={styles.lionaadhaarimg} />
                                    <Text style={styles.txt1}>GOVT. OF INDIA</Text>

                                    {adharimage != '' ?
                                        <View>
                                            <Image source={{ uri: 'data:image/png;base64,' + adharimage }} style={styles.aadhaarimg} />
                                        </View>
                                        : <Image source={require('../../../image/aadhaar3.png')} style={styles.aadhaarimg} />}


                                </View>
                                <View style={styles.addressview}>
                                    <Text style={styles.txt2}>Aadhar details : </Text>
                                    <Text style={styles.anametxt1}>{adharname}</Text>
                                </View>

                                <View style={styles.addressview}>
                                    <Text style={styles.txt22}>Aadhar number: </Text>
                                    <Text style={styles.anametxt}>**** **** **** {adhar_number.slice(-4)}</Text>
                                </View>

                                <View style={styles.addressview}>
                                    <Text style={styles.txt22}>Name: </Text>
                                    <Text style={styles.anametxt3}>{adharname}</Text>
                                </View>

                                <View style={styles.addressview}>
                                    <Text style={styles.txt22}>Address: </Text>
                                    <Text style={styles.anametxt2}>{Adharaddress}</Text>
                                </View>

                            </View>
                            <Text style={styles.txt4}><Text style={styles.txt5}>Verified</Text> on {AdharDate}</Text>
                        </View>
                        // : null
                    }
                    {/* <TouchableOpacity style={styles.btnsubmit} >
                        <Text style={styles.submittxt}>Share your verification</Text>
                    </TouchableOpacity> */}
                    {pangetData > 0 &&
                        <View>
                            <View style={styles.panview}>
                                <View style={styles.pan1view}>
                                    <Text style={styles.txtpan1}>INCOME TAX DEPERTMENT</Text>
                                    <Image source={require('../../../image/nationalemblem2.png')} style={styles.lionaadhaarimg} />
                                    <Text style={styles.txtpan2}>GOVT. OF INDIA</Text>
                                </View>
                                <View style={styles.nameview}>
                                    <Text style={styles.txtpan3}>Pan details : </Text>
                                    <Text style={styles.txtpan33}>{panname}</Text>
                                </View>
                                <Text style={styles.txtpannum}>Pan number :**** ** {pan_number.slice(-4)}</Text>
                                <Text style={styles.txtpan4}>DOB: {DOB}</Text>
                            </View>
                            <Text style={styles.txt4}><Text style={styles.txt5}>Verified</Text> on {Date}</Text>
                        </View>
                    }
                </View>
                {/* {getData  ? */}
                {(getData > 0 || pangetData > 0) &&
                    <View style={styles.lastview}>
                        <TouchableOpacity style={styles.btnsubmit} onPress={downloadPdf}>
                            <Text style={styles.submittxt}>File</Text>
                        </TouchableOpacity>
                    </View>
                }
                {/* : null} */}

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

            </ScrollView>

        </View>
    </SafeAreaView>
    )
}