import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { View, ScrollView, Image, Text, TouchableOpacity, TextInput,SafeAreaView } from 'react-native'
import { globalstyles } from '../globlestyles';
import { styles } from './styles'

// Verificationviewself others
export default function Verificationviewself() {
    const navigation = useNavigation();
    const navigateToHome = () => {
        navigation.navigate('Home');
    }
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
                                <Text style={globalstyles.usertxt}>Baby</Text>
                            </View>
                            <Text style={styles.NBStxt}>NBS ID 454545</Text>
                        </View>
                    </View>

                    <View style={styles.imgview}>
                        <Image source={require('../../../image/user15.png')} style={styles.user15img} />
                    </View>

                    {/* <View> */}
                    <Text style={styles.raghavtxt}>Babu</Text>
                    <Text style={styles.mobileno}>Mobile Number: 945198989</Text>
                    <Text style={styles.email}>E-mail: Raghav@gmail.com</Text>
                    {/* </View> */}

                    <View style={styles.addarview}>
                        <View style={styles.adar1view}>
                            <Image source={require('../../../image/lionaadhaar.png')} style={styles.lionaadhaarimg} />
                            <Text style={styles.txt1}>GOVT. OF INDIA</Text>
                            <Image source={require('../../../image/aadhaar.png')} style={styles.aadhaarimg} />
                        </View>
                        <Text style={styles.txt2}>Aadhar details : </Text>
                        <Text style={styles.txt2}>Aadhar number: **** **** 8909</Text>
                        <Text style={styles.txt2}>Name: Babu Kannan</Text>
                        <View style={styles.addressview}>
                            <Text style={styles.txt2}>Address: </Text>
                            <Text style={styles.txt3}>735 Sunset Ave West mambalam , Chennai</Text>
                        </View>

                    </View>
                    <Text style={styles.txt4}><Text style={styles.txt5}>Verified</Text> on 23/08/23</Text>

                    {/* <TouchableOpacity style={styles.btnsubmit} >
                        <Text style={styles.submittxt}>Share your verification</Text>
                    </TouchableOpacity> */}
                    <View style={styles.panview}>

                        <View style={styles.pan1view}>
                            <Text style={styles.txtpan1}>INCOME TAX DEPERTMENT</Text>
                            <Image source={require('../../../image/lionaadhaar.png')} style={styles.lionaadhaarimg} />
                            <Text style={styles.txtpan2}>GOVT. OF INDIA</Text>
                        </View>

                        <Text style={styles.txtpan3}>Pan details :</Text>
                        <Text style={styles.txtpan3}>Pan number : ****23P</Text>
                        <Text style={styles.txtpan4}>DOB: 20/10/2000</Text>
                    </View>
                    <Text style={styles.txt4}><Text style={styles.txt5}>Verified</Text> on 24/08/23</Text>

                </View>
                {/* <View style={styles.lastview}>
                    <TouchableOpacity style={styles.btnsubmit} onPress={navigateToHome}>
                        <Text style={styles.submittxt}>Back</Text>
                    </TouchableOpacity>
                </View> */}
            </ScrollView>
            </SafeAreaView>
        </View>
    )
}


