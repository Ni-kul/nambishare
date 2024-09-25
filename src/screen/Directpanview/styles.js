import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    oneview: {
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
    panview: {
        width: '80%',
        elevation: 4,
        backgroundColor: 'white',
        marginTop: '8%',
        paddingVertical: '4%',
        borderRadius: 20,
        paddingHorizontal: '5%'
    },
    pan1view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    txtpan1: {
        fontWeight: '600',
        fontSize: 8,
        color: '#A60F22',
    },
    txtpan2: {
        fontWeight: '600',
        fontSize: 11,
        color: '#A60F22',
    },
    txtpan3: {
        fontWeight: '500',
        fontSize: 16,
        color: '#A60F22',
    },
    txtpan4: {
        fontWeight: '500',
        fontSize: 16,
        color: '#A60F22',
    },

})