import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    oneview: {
        alignItems: 'center',
        marginBottom: '1%',
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
        width: 24,
        height: 26,
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
    txtf: {
        fontSize: 22,
        color: '#A60F22',
        fontWeight: '400',
    },
    panview: {
        // borderWidth: 1,
        width: '80%',
        elevation: 4,
        backgroundColor: 'white',
        marginTop: '12%',
        paddingVertical: '4%',
        // paddingTop:'2%',
        borderRadius: 20,
        paddingBottom: '20%'
    },
    pan1view: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '7%',
        justifyContent: 'space-between',
    },
    txtpan1: {
        fontWeight: '600',
        fontSize: 8,
        color: '#A60F22',
    },
    lionaadhaarimg: {
        width: 22,
        height: 22
    },
    txtpan2: {
        fontWeight: '600',
        fontSize: 11,
        color: '#A60F22',
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
    pandetailview: {
        flexDirection: 'row',
        // borderWidth: 1,
        marginTop: '4%',
        marginHorizontal: '7%'
    },
    panimgview: {
        backgroundColor: '#ffdddd',
        width: '20%',
        justifyContent: 'flex-end'
    },
    panuser1img: {
        // backgroundColor: '#ffdddd',
        // width: '78%',
        // height: 50,
        // height:'90%',
        width: 40,
        height: 44,
        alignSelf: 'center',
    },
    pantxtinputview: {
        width: '76%',
        marginLeft: '4%',
    },
    txtpan3: {
        fontWeight: '600',
        fontSize: 8,
        color: '#A60F22',
    },
    entertxt: {
        // paddingTop:11,
        marginTop: '2%',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#A60F22',
        fontSize: 12,
        height: 38,
        // width: '90%',
    },


    otptxtview: {
        marginTop: '7%',
        width: '64%',
        // borderWidth:1,
    },
    otptxt: {
        color: '#A60F22',
        fontWeight: '400',
        alignSelf: 'center'
    },
    btn: {
        alignSelf: 'center',
        width: '80%',
        marginBottom: '2%'
    },
    btnsubmit: {
        marginTop: '10%',
        backgroundColor: '#A60F22',
        // width: '80%',
        height: 40,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    submittxt: {
        color: 'white',
        fontWeight: '500',
        fontSize: 15
    },
})