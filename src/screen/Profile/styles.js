import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    firstview: {
        alignItems: 'center',
        marginBottom: '10%'
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
    logout: {
        color: '#A60F22',
    },
    // profileimgview: {
    //     backgroundColor: '#A60F22',
    //     width: 100,
    //     height: 100,
    //     borderRadius: 90,
    //     // borderWidth: 1
    // },
    profileimgview2: {
        // borderWidth: 1,
        // marginRight: '4%',
        // backgroundColor: '#A60F22',
        width: 100,
        height: 100,
        borderRadius: 90,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileuserimgview: {
        borderWidth: 1,
        width: 100,
        height: 100,
        borderRadius: 90,
        justifyContent: 'center',
    },
    userprofileimg: {
        width: 50,
        height: 50,
        alignSelf: 'center'
    },
    cameraButton: {
        position: 'absolute',
        borderRadius: 9,
        right: 12,
        bottom: 0,
        backgroundColor: 'white',
        width: 22,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cameraimg: {
        width: 14,
        height: 15,
        // backgroundColor: 'white',
        // width:'60%',
        // height:'74%'
    },
    // profileimgview: {
    //     // backgroundColor: '#A60F22',
    //     width: 100,
    //     height: 100,
    //     borderRadius: 90,
    //     justifyContent: 'flex-end',
    //     borderWidth: 1,
    // },
    // profileimgview2: {
    //     borderWidth: 1,
    //     marginRight: 4,
    //     alignSelf: 'flex-end',
    //     width: 100,
    //     height: 100,
    //     borderRadius: 90,
    //     backgroundColor: 'white',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // cameraButton: {
    //     position: 'absolute',
    //     right: 0,
    //     bottom: 0,
    // },
    // cameraimg: {
    //     width: 20, 
    //     height: 20, 
    // },
    namemain: {
        width: '100%',
        marginTop: '8%',
    },
    nameview: {
        marginTop: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '14%',
    },
    nametxt: {
        color: '#A60F22',
        fontSize: 14
    },
    pencilimg: {
        height: 18,
        width: 18
    },
    txtview: {
        flexDirection: 'row',
        marginLeft: '7%',
        alignItems: 'center'
    },
    user2img: {
        width: 18,
        height: 20,
    },
    nametxt2: {
        color: '#A60F22',
        fontSize: 14,
        width: '80%',
        // borderWidth:1,
        marginLeft: '4%',
        paddingBottom: '2%'

    },
    mobilemain: {
        width: '100%',
        marginTop: '8%',
    },
    mobiletxt: {
        color: '#A60F22',
        fontSize: 14,
        marginLeft: '14%'
    },
    callview: {
        // borderWidth:1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '7%'
    },
    callimg: {
        width: 18,
        height: 18
    },
    inputtxt: {
        width: '80%',
        color: '#A60F22',
        // borderWidth:1,
        fontWeight: '400',
        paddingBottom: '2%',
        marginLeft: '4%',
        // marginRight:'16%'
    },
    line: {
        width: '72%',
        height: 2,
        backgroundColor: '#A60F22',
        marginLeft: '14%'
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
    Emailmain: {
        width: '100%',
        marginTop: '8%',
    },
    Emailtxt: {
        // paddingTop:'2%',
        color: '#A60F22',
        fontWeight: '400',
        marginLeft: '14%'

    },
    Emailview: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '7%'

    },
    Emailimg: {
        width: 18,
        height: 20
    },
    emailinputtxt: {
        width: '80%',
        paddingBottom: '2%',
        marginLeft: '4%',
        color: '#A60F22'
    },
    Addressmain: {
        width: '100%',
        marginTop: '8%',
    },
    Addresstxt: {
        color: '#A60F22',
        fontSize: 14,
        marginLeft: '14%',
    },
    Addressview: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '7%',
        // marginRight:'20%'
    },
    loctionimg: {
        width: 21,
        height: 21
    },
    btnview: {
        marginBottom: '8%',
    },
    btnsubmit: {
        alignSelf: 'center',
        width: '80%',
        height: 40,
        backgroundColor: '#A60F22',
        justifyContent: 'center',
        borderRadius: 20
    },
    btntxt: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500'
    },

    modalview: {
        // borderWidth: 1,
        backgroundColor: '#FFFFFF',
        height: 230,
        paddingHorizontal: '4%'
    },
    modaltxt1: {
        // borderWidth:1,
        marginTop: 30,
        color: '#000000',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500'
    },
    modalbtn: {
        marginTop: 80,
        width: '100%',
        alignSelf: 'center',
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    nobtn: {
        // borderWidth: 1,
        borderRadius: 20,
        width: '40%',
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#A60F22',
    },
    nobtntxt: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500'
    },
})


