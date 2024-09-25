import AsyncStorage from '@react-native-async-storage/async-storage';

// login
export const login = async (url, data) => {
    const res = await fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify((data))
    });
    const finalRes = await res.json();
    console.log('finalRes==>>', finalRes)

    if (finalRes.success == true) {
        // await AsyncStorage.setItem('finalRes', JSON.stringify(finalRes));
        // console.log("finalRes-data:", finalRes.data[0]);
    } else {
        // alert('error')
        console.log('setItem-error')
    }
    return finalRes;
}

// verifyotp
export const verifyotp = async (url, data) => {
    const res = await fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify((data))
    });
    // console.log('data', data)
    const finalRes = await res.json();
    // console.log('finalRes otp==>>', finalRes)
    // if (finalRes.success == true) {
    //     await AsyncStorage.setItem('OTPRes', JSON.stringify(finalRes));
    //     console.log("OTPRes-data:", finalRes);
    // } else {
    //     // alert('error')
    //     console.log('setItem-OTPRes-error')
    // }
    return finalRes;
}

// resendotp
export const resendotp = async (url, data) => {
    const res = await fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify((data))
    });
    console.log('resendotp-data', data)
    const finalRes = await res.json();
    // console.log('finalRes-resendotp==>>', finalRes)
    return finalRes;
}

// uploadimage
export const uploadimage = async (url, data) => { // Accept 'url' and 'data' as function parameters
    try {
        const res = await fetch(url, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }, body: JSON.stringify((data))
        });

        const finalRes = await res.json();
        // console.log('finalRes imdf==>>', finalRes.data)
        return finalRes.data;

    } catch (error) {
        console.error('Error uploading image:', error);
        return {
            success: false,
            error: 'Image upload failed',
        };
    }
}

// updateuserprofile
export const updateuserprofile = async (url, data) => {
    const res = await fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify((data))
    });
    // console.log('data --', data)
    const finalRes = await res.json();
    // console.log('finalRes==updatedUserData>>', finalRes)

    // return finalRes;
}
// panverify
export const panverify = async (url, data) => {
    const res = await fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify((data))
    });
    console.log('data', data)
    const finalRes = await res.json();
    // console.log('finalRes==UserpanData>>', finalRes)
    return finalRes;
}

// mycard - verify view
export const mycard = async (url, data) => {
    const res = await fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify((data))
    });
    const finalRes = await res.json();
    // console.log('finalRes mycard detail..==>>', finalRes)
    return finalRes;

}
// adharverify
export const adharverify = async (url, data) => {
    const res = await fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify((data))
    });
    console.log('data-FVfy', data)
    const finalRes = await res.json();
    // console.log('finalFun==UseradharverifyData---', finalRes)
    return finalRes;
}

// adharotpverify
export const adharotpverify = async (url, data) => {
    const res = await fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify((data))
    });
    // console.log('data-Fotp', data)
    const finalRes = await res.json();
    // console.log('finalFun==adhar-OTP-verifyData---', finalRes)
    return finalRes;
}
// search
export const search = async (url, data) => {
    const res = await fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify((data))
    })
    // console.log('data search-', data)
    const finalRes = await res.json();
    // console.log('finalFun--search--', finalRes)
    return finalRes;
}
// sharedetail
export const sharedetail = async (url, data) => {
    const res = await fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify((data))
    })
    // console.log('data sharedetail-', data)
    const sharedetaildata = await res.json();
    // console.log('finalFun--sharedetaildata--', sharedetaildata)
    return sharedetaildata;
}
// getshared
export const getshared = async (url, data) => {
    const res = await fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify((data))
    })
    // console.log('data getshared-', data)
    const sgetshareddata = await res.json();
    // console.log('finalFun--getshared--', sgetshareddata)
    return sgetshareddata;
}


export const getconfig = async (url) => {
    const res = await fetch(url, {
        method: 'get',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })

    const sgetshareddata = await res.json();
    return sgetshareddata;
}


// deleteaccount
export const deleteaccount = async (url, data) => {
    const res = await fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify((data))
    });
    // console.log('data --', data)
    const finalRes = await res.json();
    // console.log('finalRes -- deleteaccount >>', finalRes)

    return finalRes;
}
