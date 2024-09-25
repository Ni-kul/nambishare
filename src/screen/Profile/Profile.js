import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, Alert, ActivityIndicator, SafeAreaView, Button } from 'react-native'
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image'
import Modal from "react-native-modal";
import { styles } from './styles'
import { deleteaccount, uploadimage } from '../API';
import { updateuserprofile } from '../API'
import { globalstyles } from '../globlestyles';
import { BannerAd, TestIds, MobileAds, BannerAdSize, InterstitialAd, AdEventType, AppOpenAd } from 'react-native-google-mobile-ads';


MobileAds().initialize().then(adapterStatuses => {
    // console.log('MobileAds initialized', adapterStatuses);
});


export default function Profile() {

    const [profile_image, setImageUri] = useState(null);
    const [nbsid, setnbsid] = useState('');
    const [id, setid] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [userDataObject, setUserDataObject] = useState(null);
    const [imageUpdated, setImageUpdated] = useState();
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [interstitialAd, setInterstitialAd] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const loadData = async () => {
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
            // try {
            setLoading(true);
            const userData = await AsyncStorage.getItem('finalRes');
            setLoading(false);
            // console.log('profile in AsyncStorage:', userData);
            const userDataArray = JSON.parse(userData);

            if (userDataArray) {
                {
                    const userDataObject = userDataArray;
                    // console.log('Data in userDataObject:', userDataObject);
                    // console.log('userDataObject.name', userDataObject.name);
                    setUserDataObject(userDataObject);
                    setid(userDataObject.id)
                    setnbsid(userDataObject.nbs_id)
                    setName(userDataObject.name);
                    // console.log('userDataObjectname:', userDataObject.name);
                    setEmail(userDataObject.email);
                    setMobile(userDataObject.mobile);
                    setAddress(userDataObject.address);
                    // const hello = userDataObject.profile_image.replace('images', '')
                    // console.log('hello',hello)
                    // setImageUri(hello);
                    // setImageUpdated(hello);
                    setImageUri(userDataObject.profile_image);
                    setImageUpdated(userDataObject.profile_image)
                }
            } else {
                navigation.navigate('Login');
                // console.log('Data array is empty or not an array.');
            }
        };
        navigation.addListener('focus', () => {
            loadData();
        })
    }, []);

    function select() {
        // Alert.alert('alert ! , ok')
        Alert.alert("", "Select Option", [
            {
                text: 'Back',
                onPress: () => { }
            },

            {
                text: 'Camera',
                onPress: () => openCamera(),
            },
        ]);
    }
    const openCamera = async () => {
        let options = {
            mediaType: 'photo',
            includeBase64: true,
        }
        ImagePicker.launchCamera(options, async (resp) => {
            setLoading(true);
            const includeBase64 = resp.assets[0].base64;
            // console.log(includeBase64);

            const data = {
                base64: 'data:image/jpeg;base64,' + includeBase64,
            }
            const img = await uploadimage(global.URL + 'uploadimage', data)
            // console.log('imgC--?????????????', img)
            if (img) {
                const hello = img.replace('images', '')
                // console.log('hello', hello)
                setImageUpdated(hello);
                setImageUri(hello);
                // Save the updated profile image URI in AsyncStorage
                //await AsyncStorage.setItem('profile_image', 'https://www.demo603.amrithaa.com/namibishare/admin/public/' + img);
                setLoading(false);
                const UserData = {
                    user_id: id,
                    name: name,
                    email: email,
                    mobile: mobile,
                    address: address,
                    profile_image: hello,
                };
                // console.log('UserData----------(11)', UserData)

                await updateuserprofile(global.URL + 'updateuserprofile', UserData)
                // console.log('updatedUserData--(22)', UserData)
                setLoading(false);

                const result1 = await AsyncStorage.getItem('finalRes')
                // console.log('Data in result1 UserInfo-(33) :', result1);

                const screenData = JSON.parse(result1)
                // console.log('Data in screenData--(44) :', screenData);

                const newUpdatedUserInfo = {
                    ...screenData,
                    "name": name,
                    "email": email,
                    "mobile": mobile,
                    "address": address,
                    "profile_image": hello,
                };
                // console.log('newUpdatedUserInfo:--(55)', newUpdatedUserInfo);

                AsyncStorage.setItem('finalRes', JSON.stringify(newUpdatedUserInfo))

                const updateget = await AsyncStorage.getItem('finalRes');
                // console.log('Data updateget--(66):', updateget);

            } else {
                // console.log('openCamera-img-?????????????')
            }
        });
    }

    const openLibrary = () => {
        let options = {
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 200,
            maxWidth: 200,
        }
        ImagePicker.launchImageLibrary(options, async resp => {
            // console.log('resp', resp);
            setLoading(true);
            let includeBase64 = resp.assets[0].base64;
            // console.log('ImageLibrary-includeBase64', includeBase64)

            const data = {
                base64: 'data:image/jpeg;base64,' + includeBase64,
            }
            const img = await uploadimage(global.URL + 'uploadimage', data)
            // console.log('imgL--', img)
            if (img) {
                const well = img.replace('images', '')
                // console.log('well', well)
                setImageUri(well);
                setImageUpdated(well)
                // Save the updated profile image URI in AsyncStorage
                // await AsyncStorage.setItem('profile_image', 'https://www.demo603.amrithaa.com/namibishare/admin/public/' + img);
                setLoading(false);
                const UserData = {
                    user_id: id,
                    name: name,
                    email: email,
                    mobile: mobile,
                    address: address,
                    profile_image: well,
                };
                // console.log('UserData----------(11)', UserData)

                await updateuserprofile(global.URL + 'updateuserprofile', UserData)
                // console.log('updatedUserData--(22)', UserData)
                setLoading(false);

                const result1 = await AsyncStorage.getItem('finalRes')
                // console.log('Data in result1 UserInfo-(33) :', result1);

                const screenData = JSON.parse(result1)
                // console.log('Data in screenData--(44) :', screenData);

                const newUpdatedUserInfo = {
                    ...screenData,
                    "name": name,
                    "email": email,
                    "mobile": mobile,
                    "address": address,
                    "profile_image": well,
                };
                // console.log('newUpdatedUserInfo:--(55)', newUpdatedUserInfo);

                AsyncStorage.setItem('finalRes', JSON.stringify(newUpdatedUserInfo))

                const updateget = await AsyncStorage.getItem('finalRes');
                // console.log('Data updateget--(66):', updateget);

            } else {
                // console.log('openLibrary-img-?????????????')
            }
        })
    }

    const LogOut = async () => {
        const finalRes = await AsyncStorage.removeItem('finalRes');
        // const proimg = await AsyncStorage.removeItem('profile_image');
        // console.log('proimg-LogOut', proimg)
        // console.log('finalRes-LogOut', finalRes)

        navigation.navigate('Login');
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const modalclose = () => {
        setModalVisible(false);
    };

    const deleteacount = async () => {

        const userData = await AsyncStorage.getItem('finalRes');
        const userDataArray = JSON.parse(userData);

        if (userDataArray) {

            const userDataObject = userDataArray;
            const data = {
                user_id: userDataObject.id
            };

            const result = await deleteaccount(global.URL + 'deleteaccount', data)
            // console.log('result', result)
            if (result.success == true) {
                await AsyncStorage.removeItem('finalRes');
                setModalVisible(false);
                navigation.navigate('Splashtwo');
            }

        }
    }



    const updateuser = async () => {
        if (name == '') {
            alert('Please enter name.');
        }
        else if (email == '') {
            alert('Please enter email.');
        }
        else if (mobile == '') {
            alert('Please enter mobile.');
        }
        else if (address == '') {
            alert('Please enter address.');
        } else {
            setLoading(true);
            const UserData = {
                user_id: id,
                name: name,
                email: email,
                mobile: mobile,
                address: address,
                profile_image: imageUpdated,
            };
            // console.log('UserData----------(1)', UserData)

            updateuserprofile(global.URL + 'updateuserprofile', UserData)
            // console.log('updatedUserData--(2)', UserData)
            setLoading(false);

            const result1 = await AsyncStorage.getItem('finalRes')
            // console.log('Data in result1 UserInfo-(3) :', result1);

            const screenData = JSON.parse(result1)
            // console.log('Data in screenData--(4) :', screenData);

            const newUpdatedUserInfo = {
                ...screenData,
                "name": name,
                "email": email,
                "mobile": mobile,
                "address": address,
                "profile_image": imageUpdated,
            };
            // console.log('newUpdatedUserInfo:--(5)', newUpdatedUserInfo);

            AsyncStorage.setItem('finalRes', JSON.stringify(newUpdatedUserInfo))

            const updateget = await AsyncStorage.getItem('finalRes');
            // console.log('Data updateget--(6):', updateget);
            setEditMode(false);
            alert('Profile updated successfully ');
        }
    };

    // const showInterstitialAd = () => {
    //     if (interstitialAd) {
    //         interstitialAd.show();
    //         setInterstitialAd(null);
    //         // Preload next ad
    //         const newInterstitial = InterstitialAd.createForAdRequest('ca-app-pub-3940256099942544/1033173712', {
    //             keywords: ['fashion', 'clothing'],
    //         });

    //         newInterstitial.addAdEventListener(AdEventType.LOADED, () => {
    //             console.log('New interstitial ad loaded');
    //             setInterstitialAd(newInterstitial);
    //         });

    //         newInterstitial.addAdEventListener(AdEventType.ERROR, (error) => {
    //             console.error('New interstitial ad failed to load: ', error);
    //         });

    //         newInterstitial.load();
    //     } else {
    //         console.log('Interstitial ad is not loaded yet');
    //     }
    // };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#A60F22' }}>
            <View style={styles.container}>

                <ScrollView>

                    <View style={styles.firstview}>

                        <View style={{ width: '100%', backgroundColor: '#A60F22', }}>
                            <View style={styles.headdesing}></View>
                            <View style={styles.userdesingview}>

                                {/* <View style={styles.userview}>
                                    <Image source={require('../../../image/user.png')} style={styles.userimg} />
                                    <Text style={styles.usertxt}> {userDataObject ? userDataObject.name : ''}</Text>
                                </View> */}

                                <View style={globalstyles.userview}>
                                    <Image source={require('../../../image/user.png')} style={globalstyles.userimg} />
                                    <Text style={globalstyles.usertxt}>{userDataObject ? userDataObject.name : ''}</Text>

                                </View>
                                <Text style={styles.NBStxt}>NBS ID {nbsid}</Text>
                            </View>
                        </View>

                        <TouchableOpacity onPress={toggleModal}><Text style={styles.logout}>Delete account</Text></TouchableOpacity>
                        <TouchableOpacity onPress={LogOut}><Text style={styles.logout}>LOG-OUT</Text></TouchableOpacity>

                        {/* <View style={styles.profileimgview}> */}
                        <View style={styles.profileimgview2}>

                            {profile_image == null ?

                                <View style={styles.profileuserimgview}>
                                    <Image source={require('../../../image/user.png')} style={styles.userprofileimg} />
                                </View>
                                :
                                <FastImage resizeMode='cover' style={{
                                    // resizeMode='contain' ----
                                    // resizeMode='cover'  ----
                                    width: 100,
                                    height: 100,
                                    borderRadius: 90,
                                    backgroundColor: '#A60F22',
                                    // borderWidth: 1  https://www.demo603.amrithaa.com/namibishare/admin/public/images/
                                }}
                                    // {profile_image == }
                                    source={{ uri: 'http://www.app.nambishaer.com/admin/public/images' + profile_image }}
                                >
                                </FastImage>
                            }
                            <TouchableOpacity onPress={openCamera} style={styles.cameraButton}>
                                <Image source={require('../../../image/photocamera.png')} style={styles.cameraimg} />
                            </TouchableOpacity>
                        </View>
                        {/* </View> */}

                        {/* Name */}
                        <View style={styles.namemain}>
                            <View style={styles.nameview}>
                                <Text style={styles.nametxt}>Name</Text>
                                {!editMode && (
                                    <TouchableOpacity onPress={() => setEditMode(true)}>
                                        <Image source={require('../../../image/pencil.png')} style={styles.pencilimg} />
                                    </TouchableOpacity>
                                )}

                            </View>
                            <View style={styles.txtview}>
                                <Image source={require('../../../image/user.png')} style={styles.user2img} />
                                {!editMode ? (
                                    <Text style={styles.nametxt2}>{name}</Text>
                                ) : (
                                    <TextInput
                                        style={styles.nametxt2}
                                        placeholderTextColor='#A60F22'
                                        value={name}
                                        onChangeText={(text) => setName(text)}
                                    />
                                )}

                            </View>
                            <Text style={styles.line}></Text>

                        </View>
                        {loading ?
                            <View style={styles.spinner}>
                                <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                            </View>
                            : null}
                        {/* E-mail */}
                        <View style={styles.Emailmain}>
                            <Text style={styles.Emailtxt}>E-mail</Text>
                            <View style={styles.Emailview}>
                                <Image source={require('../../../image/mail.png')} style={styles.Emailimg} />
                                {!editMode ? (
                                    <Text style={styles.emailinputtxt}>{email}</Text>
                                ) : (
                                    <TextInput
                                        style={styles.emailinputtxt}
                                        placeholderTextColor='#A60F22'
                                        value={email}
                                        onChangeText={(text) => setEmail(text)}
                                    />
                                )}

                            </View>
                            <Text style={styles.line}></Text>
                        </View>
                        {/* Mobile Number */}
                        <View style={styles.mobilemain}>
                            <Text style={styles.mobiletxt}>Mobile Number</Text>
                            <View style={styles.callview}>
                                <Image source={require('../../../image/call.png')} style={styles.callimg} />
                                {!editMode ? (
                                    <Text style={styles.inputtxt}>{mobile}</Text>
                                ) : (
                                    <TextInput
                                        style={styles.inputtxt}
                                        placeholderTextColor='#A60F22'
                                        value={mobile}
                                        onChangeText={(text) => setMobile(text)}
                                    />
                                )}

                            </View>
                            <Text style={styles.line}></Text>
                        </View>

                        {/* Address */}
                        <View style={styles.Addressmain}>
                            <Text style={styles.Addresstxt}>Address</Text>
                            <View style={styles.Addressview}>
                                <Image source={require('../../../image/maplocator.png')} style={styles.loctionimg} />
                                {!editMode ? (
                                    <Text style={styles.inputtxt}>{address}</Text>
                                ) : (
                                    <TextInput
                                        style={styles.inputtxt}
                                        placeholderTextColor='#A60F22'
                                        multiline={true}
                                        value={address}
                                        onChangeText={(text) => setAddress(text)}
                                    />
                                )}
                            </View>
                            <Text style={styles.line}></Text>
                        </View>

                    </View>

                    <View style={{ alignSelf: 'center' }}>
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

                {editMode == true ?
                    <View style={styles.btnview}>
                        <TouchableOpacity style={styles.btnsubmit} onPress={updateuser}>
                            <Text style={styles.btntxt}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    null
                }

                <Modal isVisible={isModalVisible} onBackButtonPress={modalclose} onBackdropPress={modalclose}>
                    <View style={styles.modalview}>
                        <Text style={styles.modaltxt1}>Are you sure? you want to delete your account</Text>
                        <View style={styles.modalbtn}>
                            <TouchableOpacity style={styles.nobtn} onPress={modalclose}>
                                <Text style={styles.nobtntxt}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.nobtn} onPress={deleteacount}>
                                <Text style={styles.nobtntxt}>Delete</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}