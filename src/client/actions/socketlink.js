import cookie from 'react-cookie';
import * as types from '../../constants/action_type';

export const connectSocket = (devicename, socket) => {
    console.log(devicename);
    let result = socket.emit('login', { uid: devicename });
    return {
        type: types.CONNECT_SOCKET,
        devicename: devicename,
        connect: true
    };
}

export const receiveAuth = () => {
    const devicename = cookie.load('devicename');
    if(typeof devicename == "undefined"){
        const error = 'cookie에 값이 저장되어 있지 않습니다.'
        return {
            type: types.AUTH_LOAD_DEVICE_FAIL,
            error
        }
    }else{
        return {
            type: types.AUTH_LOAD_DEVICE_SUCCESS,
            devicename
        }
    }
}

export const checkAuth = () => {
    if (cookie.load('devicename')) {
        return true;
    }
    return false;
}


export const addDeviceName = (devicename) =>{
    return {
        type: types.AUTH_LOAD_DEVICE_SUCCESS,
        devicename
    }
    //todo: 신규 device 서버를 통해 등록 후 쿠키 또는 로컬스토리지에 저장
    // return dispatch => {
    //     dispatch(requestSignUp())
    //     return fetch('/api/sign_up', {
    //         method: 'post',
    //         headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //     })
    //         .then(response => {
    //             if(response.ok) {
    //                 cookie.save('username', user.username)
    //                 dispatch(receiveUser(user.username));
    //                 browserHistory.push('/chat');
    //             }
    //         })
    //         .catch(error => {throw error});
    // };
}