import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    oneview: {

        marginBottom: 20
    },
    headdesing: {
        height: 20,
        width: '100%',
        backgroundColor: '#A60F22',
    },
    userdesingview: {
        height: 140,
        width: '100%',
        justifyContent: 'center',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 140,
        backgroundColor: '#ffffff',
    },
    userimg: {
        width: 24,
        height: 26,
    },
    usertxt: {
        fontWeight: '500',
        fontSize: 20,
        color: '#A60F22',
    },
    userview: {
        // borderWidth:1,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginLeft: '26%',
        marginTop: '10%',
        paddingBottom: 1
    },
    usertxt: {
        fontWeight: '500',
        fontSize: 20,
        color: '#A60F22',
        // paddingTop: 1
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
    txt1: {
        fontSize: 22,
        color: '#A60F22',
        fontWeight: '400',
        alignSelf: 'flex-start',
        marginLeft: '8%',
        marginTop: '8%'
    },
    txt10: {
        marginTop: '8%',
        fontWeight: '400',
        fontSize: 16,
        color: '#A60F22',
        textAlign: 'center',
        width: '90%'
    },
    listview: {
        marginTop: '8%',
        width: '80%',
        flexDirection: 'row',
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: '4%',
        paddingHorizontal: '4%',
    },
    listuserimg: {
        height: 28,
        width: 26
    },
    txtmainview: {
        marginLeft: '4%',
        width: '90%'
    },
    nameview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: '4%'
    },
    dateview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: '10%'
    },
    txt2: {
        fontSize: 14,
        color: '#A60F22',
        fontWeight: '400',
    },
    rightchevronimg: {
        width: 18,
        height: 20,
    },
    txt3: {
        fontSize: 11,
        color: '#A60F22',
        fontWeight: '400',
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
    DirectVerify: {
        marginTop: '6%',
        alignSelf: 'flex-start',
        width: '40%',
        marginLeft: '10%'
    },
    Verifyimgview: {
        width: '100%',
        height: 110,
        elevation: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 20
    },
    Verifytxt: {
        color: '#A60F22',
        fontSize: 14,
        fontWeight: '400',
        alignSelf: 'flex-start',
        marginLeft: '13.6%',
        marginTop: '1%',
    },
    Verifyimg: {
        width: 68,
        height: 68,
        alignSelf: 'center',
    },
    Verify: {
        color: '#A60F22',
        fontSize: 14,
        fontWeight: '500',
        alignSelf: 'center',
        marginTop: '1%',
    },
})