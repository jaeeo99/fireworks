import { combineReducers } from 'redux';
import * as types from '../../constants/action_type';

const authState = {
    loaded: false,
    loading: false,
    devicename: null,
    socketID: null
};

const authReducer = (state = authState, action = {}) => {
    switch (action.type){
        case types.AUTH_LOAD_DEVICE:
            return Object.assign({}, state, {
                    loading: true
                });
        case types.AUTH_LOAD_DEVICE_SUCCESS:
            return Object.assign({}, state, {
                    loading: false,
                    loaded: true,
                    devicename: action.devicename
                });
        case types.AUTH_LOAD_DEVICE_FAIL:
            return Object.assign({}, state, {
                    loading: false,
                    loaded: true,
                    error: action.error
                });
        case types.CONNECT_SOCKET:
            console.log(action);
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                devicename: action.devicename,
                socketID: action.devicename
            });
        default:
            return state;
    }
};

const socketLinkReducer = combineReducers({
    authReducer
});

export default socketLinkReducer;
export {authReducer};