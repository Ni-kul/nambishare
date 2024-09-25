import { StyleSheet } from 'react-native'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#F5F5F5'
        backgroundColor: 'white',
        height: '100%',
        // borderWidth: 1
    },
    spinner: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(24, 24, 24, 0.075)',
        position: 'absolute',
        top: 0,
        zIndex: 9999,
        height: '100%',
        width: '100%'
    },
    fview: {
        // height: '100%'
        height: '50%', //-----------------------
        // borderWidth:1
        // zIndex:999999999999999,
        backgroundColor:'white'
    },
    logoimg: {
        marginTop: '6%',
        // height: '16%',
        // width: 188,
        width: 189,
        height: 115,
        alignSelf: 'center'
    },
    logtxt: {
        marginTop: '10%',
        marginLeft: '10%',
        color: '#A60F22',
        fontWeight: '400',
        fontSize: 22
    },
    line: {
        marginTop: '1%',
        width: '9.5%',
        height: 2,
        backgroundColor: '#A60F22',
        marginLeft: '10%',

    },
    mobiletxt: {
        marginTop: '6%',
        marginLeft: '17%',
        color: '#A60F22',
        fontSize: 14,
    },
    callview: {
        // marginTop: '-6%',
        flexDirection: 'row',
        // borderWidth:1,
        borderBottomColor: '#A60F22',
        alignItems: 'center',
        // height: '12%',
        marginLeft: '10%',

    },
    callimg: {
        // marginLeft: '13%',
        width:16,
        height:16
    },
    inputtxt: {
        color: '#A60F22',
        // borderWidth:1,
        width: '80%',
        marginLeft: '5%',
        fontWeight: '400',
        paddingBottom: '2%'
    },
    line2: {
        // marginTop: '-6%',
        width: '70%',
        height: 2,
        backgroundColor: '#A60F22',
        marginLeft: '18%',
    },
    // checkboxview: {
    //     flexDirection: 'row',
    //     marginTop: '2%',
    //     marginLeft: '8%',
    //     alignItems: 'center',
    //     // marginBottom: '8%',
    //     position: 'absolute'
    //     // borderWidth:1,
    // },
    check: {
        transform: [{ scale: 0.7 }]
    },
    checktxt: {
        color: '#A60F22',
        fontWeight: '400',
        // fontSize:14
    },
    lastview: {
        // height: 320,
        height: '54%', //----------------------------
        backgroundColor: '#85B34F',
        marginBottom: 0,
        //borderWidth: 1,
    },
    lastviewone: {
        backgroundColor: 'red',
        // height:'50%',
        borderBottomWidth: 136,
        borderBottomRightRadius: 170,
        borderColor: 'white',
        // borderWidth: 1
    },
    zIndexContainer: {
        // zIndex: -221,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    // lastviewtwo: {
    //     // height: '100%',
    //     paddingTop: '4%',
    //     position: 'absolute',
    //     marginTop: '28%',
    //     alignSelf: 'center'
    //     // zIndex: 2, 
    // },
    // logintxt: {
    //     color: '#A60F22',
    //     fontWeight: '400',
    //     fontSize: 14,
    //     height: 38,
    //     width: 110,
    //     textAlign: 'center',
    //     borderRadius: 30,
    //     backgroundColor: 'white',
    //     paddingTop: 8,
    // },
    // loginimg: {
    //     width: '100%',
    //     height: 224,
    // },

    // ------------------------old 
    lastviewtwo: {
        // height: '100%',
        paddingTop: '4%',
        // position:'absolute'
    },
    logintxt: {
        color: '#A60F22',
        fontWeight: '400',
        fontSize: 14,
        height: 38,
        width: 110,
        alignSelf: 'center',
        textAlign: 'center',
        borderRadius: 30,
        backgroundColor: 'white',
        paddingTop: 8,
        // borderWidth:1
    },
    loginimg: {
        width: '100%',
        height: 224,
    },
    checkboxview: {
        flexDirection: 'row',
        marginTop: '2%',
        marginLeft: '8%',
        alignItems: 'center',
        // marginBottom: '8%',
        position: 'absolute'
        // borderWidth:1,
    },
    check: {
        transform: [{ scale: 0.7 }]
    },
    checktxt: {
        color: '#A60F22',
        fontWeight: '400',
        // fontSize:14
    },
})