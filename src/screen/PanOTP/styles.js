import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    oneview: {
        alignItems: 'center',
        marginBottom:'7%'
    },
    headdesing: {
        height: 20,
        width: '100%',
        backgroundColor: '#A60F22',
    },
    userdesingview: {
        height: 140,
        width: '100%',
        // borderWidth:1,
        justifyContent: 'center',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 140,
        backgroundColor: '#ffffff',
    },
    userview: {
        flexDirection: 'row',
    },
    userimg: {
        marginLeft: '26%',
        width:24,
        height:26,
        marginBottom: '0.5%'
    },
    usertxt: {
        fontWeight: '500',
        fontSize: 20,
        color: '#A60F22',
        paddingTop: '0.5%'
    },
    NBStxt: {
        // marginTop: '1%',
        fontWeight: 'bold',
        fontSize: 22,
        color: '#ffffff',
        backgroundColor: '#A60F22',
        width: '56%',
        height: 46,
        textAlign: 'center',
        paddingTop: 8,
        borderRadius: 22,
        alignSelf: 'center'
    },
    EnterOTPtxt: {
        marginTop:'8%',
        fontSize: 22,
        color: '#A60F22',
        fontWeight: '400'
    },

    talkBubble: {
        backgroundColor: "transparent",
        marginTop:'8%',
    },
    talkBubbleSquare: {
        width: 92,
        height: 50,
        // width: '50%',
        // height: '30%',
        backgroundColor: "#A60F22",
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    otpmsgtxt: {
        fontWeight: '400',
        color: 'white',
        fontSize: 24
    },
    talkBubbleTriangle: {
        position: "absolute",
        left: 36,
        top: 22,
        bottom: -26,
        width: 0,
        height: 0,
        borderTopColor: "transparent",
        borderTopWidth: 30,
        borderRightWidth: 12,
        borderRightColor: "#A60F22",
        borderBottomWidth: 20,
        borderBottomColor: "transparent",
        transform: [{ rotate: "54deg" }],
    },
    Verifytxt: {
        marginTop: '10%',
        fontSize: 22,
        color: '#A60F22',
        fontWeight: '400'
    },
    txtl1:{
        marginTop: '10%',
        fontSize: 14,
        color: '#A60F22',
        fontWeight: '400'
    },
    txtl2:{
        marginTop: '1%',
        fontSize: 14,
        color: '#A60F22',
        fontWeight: '400'
    },
    lastview: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2%',
        backfaceVisibility:'visible'
    },
    btnsubmit: {
        backgroundColor: '#A60F22',
        width: '80%',
        height: 40,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submittxt: {
        color: 'white',
        fontWeight: '500',
        fontSize: 15
    },
})

