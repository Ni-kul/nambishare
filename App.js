import * as React from 'react';
import { Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './src/screen/Home/Home';
// import DashBoardHome from './src/screen/DashBoardHome/DashBoardHome';
import DashBoardHome from './src/screen/DashBoardHome/DashBoardHome'
import Profile from './src/screen/Profile/Profile'
import Verify from './src/screen/Verify/Verify'
import File from './src/screen/File/File'
import Splash from './src/screen/Splash/Splash';
import Splashtwo from './src/screen/Splashtwo/Splashtwo';
import Login from './src/screen/Login/Login';
import LoginOTP from './src/screen/LoginOTP/LoginOTP';
import Verifyaadhar from './src/screen/Verifyaadhar/Verifyaadhar';
import AadharOTP from './src/screen/AadharOTP/AadharOTP';
import Verificationviewself from './src/screen/Verificationviewself/Verificationviewself';
import VerifyPan from './src/screen/VerifyPan/VerifyPan';
import PanOTP from './src/screen/PanOTP/PanOTP';
import Sharedverificationlist from './src/screen/Sharedverificationlist/Sharedverificationlist';
// import Verifyviewothers from './src/screen/Verifyviewothers/Verifyviewothers';
import Shareto from './src/screen/Shareto/Shareto';
import DirectVerify from './src/screen/DirectVerify/DirectVerify';
import DIrectaadharOTP from './src/screen/DIrectaadharOTP/DIrectaadharOTP';
import Directpanotp from './src/screen/Directpanotp/Directpanotp';
import DirectAaverifyview from './src/screen/DirectAaverifyview/DirectAaverifyview';
import Directpanview from './src/screen/Directpanview/Directpanview';
import TandC from './src/screen/TandC/TandC';
import { View, Text } from 'react-native'
import Validate from './src/screen/Validate/Validate';
// import Camera from './src/screen/Camera/Camera';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// global.URL = 'https://www.demo603.amrithaa.com/namibishare/admin/public/api/';
global.URL = 'http://www.app.nambishaer.com/admin/public/api/';

export function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarInactiveBackgroundColor: '#85B34F',
      tabBarActiveBackgroundColor: '#85B34F',
      tabBarShowLabel: false,

    }} >
      <Tab.Screen name="HomeS"
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require('./image/home.png')}
                style={{
                  height: focused ? 36 : 30,
                  width: focused ? 42 : 38,
                  marginTop: focused ? -34 : 0,
                  borderColor: focused ? 'white' : 'transparent',
                  borderWidth: focused ? 3 : 0,
                  borderRadius: focused ? 20 : 0,
                }}
              />
              {focused && (
                <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', fontWeight: '500', marginTop: 2 }}>Home</Text>
              )}
            </View>
          ),
        }}
        component={Home}
      />
      <Tab.Screen name="Profile" component={Profile}
        options={{
          // tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require('./image/personbig.png')}
                style={{
                  height: focused ? 42 : 40,
                  width: focused ? 44 : 44,
                  marginTop: focused ? -34 : 0,
                  borderColor: focused ? 'white' : 'transparent',
                  borderWidth: focused ? 3 : 0,
                  borderRadius: focused ? 20 : 0,
                }}
              />
              {focused && (
                <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', fontWeight: '500', marginTop: 2 }}>Profile</Text>
              )}
            </View>
          ),
        }}
      />
      {/*  */}
      <Tab.Screen name="Share" component={Verify}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require('./image/verifybig.png')}
                style={{
                  height: focused ? 38 : 38,
                  width: focused ? 38 : 38,
                  alignSelf: 'center',
                  marginTop: focused ? -34 : 0,
                  borderColor: focused ? 'white' : 'transparent',
                  borderWidth: focused ? 3 : 0,
                  borderRadius: focused ? 20 : 0,
                }}
              />
              {focused && (
                <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', fontWeight: '500', marginTop: 2 }}>Verify</Text>
              )}
            </View>
          ),
        }} />
      <Tab.Screen name="File" component={File}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require('./image/shareimgicon.png')}
                style={{
                  height: focused ? 38 : 42,
                  width: focused ? 37 : 44,
                  marginTop: focused ? -34 : 0,
                  borderColor: focused ? 'white' : 'transparent',
                  borderWidth: focused ? 3 : 0,
                  borderRadius: focused ? 20 : 0,
                  marginLeft: 20
                }}
              />
              {focused && (
                <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', fontWeight: '500', marginTop: 2 }}>Create report</Text>
              )}
            </View>
          ),
        }} />
    </Tab.Navigator>
  )
}
export default function App() {

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Splashtwo">
        <Stack.Screen
          // Homescreen name:- HomeS
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DashBoardHome"
          component={DashBoardHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Splashtwo"
          component={Splashtwo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TandC"
          component={TandC}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="LoginOTP"
          component={LoginOTP}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Verifyaadhar"
          component={Verifyaadhar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AadharOTP"
          component={AadharOTP}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Verificationviewself"
          component={Verificationviewself}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifyPan"
          component={VerifyPan}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PanOTP"
          component={PanOTP}
          options={{ headerShown: false }}
        />
        {/* Sharedverificationlist */}
        <Stack.Screen
          name="Sharedverificationlist"
          component={Sharedverificationlist}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="Validate"
          component={Validate}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="Shareto"
          component={Shareto}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="DirectVerify"
          component={DirectVerify}
          options={{ headerShown: false }} />
        {/* Directpanview */}
        <Stack.Screen
          name="DIrectaadharOTP"
          component={DIrectaadharOTP}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="Directpanotp"
          component={Directpanotp}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="DirectAaverifyview"
          component={DirectAaverifyview}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="Directpanview"
          component={Directpanview}
          options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}
// "@react-navigation/stack": "^6.3.16",
// npm i @react-native-community/checkbox 0.5.14