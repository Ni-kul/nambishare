import { StyleSheet } from 'react-native'
export const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        height: '100%',
        backgroundColor:'white'
        // borderWidth: 1,
    },
    oneview: {
        alignItems: 'center',
        marginTop: '18%',
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
    txt1: {
        fontSize: 22,
        color: '#A60F22',
        fontWeight: '500'
    },
    txt2: {
        color: '#A60F22',
        fontWeight: '500',
        width: '70%',
        textAlign: 'center',
        marginTop: '5%',
        // fontSize: 15,
    },
    timeview: {
        marginTop: '26%',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent:'center'
    },
    timeimg: {
        // marginTop:1,
        width: 17,
        height: 17
    },
    txttime: {
        color: '#A60F22',
        marginLeft: '2%',
        fontSize: 15,
        fontWeight: '400',

    },
    btntouchble: {
        backgroundColor: '#85B34F',
        width: '60%',
        height: 60,
        borderRadius: 24,
        marginTop: '8%',
    },
    btntxt: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        paddingTop: 16
    },
    txt3: {
        marginTop: '8%',
        fontSize: 15,
        color: '#A60F22',
        fontWeight: '500'
    },
    txt31: {
        color: '#000000',
        fontSize: 15,
        fontWeight: '500'
    },
    line: {
        // flex:1,
        // marginTop: '28%',
        // backgroundColor: '#A60F22',
        width: '30%',
        // height:'50%',
        height: 1.4,
        // borderWidth: 1,
        alignSelf: 'center',
        justifyContent: 'flex-end',
        marginBottom: '2%'
    },
    linetxt: {
        width: '100%',
        height: 1.4,
        // borderWidth: 1,
        backgroundColor: '#A60F22',

    },
})