import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native'
import { styles } from './styles'
import { getconfig } from '../API'


export default function TandC() {

    const [data, setdata] = useState('');
    const navigation = useNavigation();

    // function ber() {

    // }

    useEffect(() => {

        var data = '';
        getconfig(global.URL + 'getconfig').then((res) => {
            // console.log('res.data', res.data)
            setdata(res.data[1].value);
        })
        // const Otpres = await verifyotp(global.URL + 'verifyotp', data);
        // setLoading(false);

        // if (Otpres.success == true) {
        //     
        // } 
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View><Text> Back </Text></View>
            </TouchableOpacity>
            <SafeAreaView>{data ?
                <View>
                    <Text style={{ marginTop: 20, fontSize: 18 }}>Terms & Conditions</Text>
                    <Text style={{ marginTop: 20, width: '97%' }}>{data}</Text></View> : null

            }

            </SafeAreaView>
        </View>
    )
}