import React, { PropTypes } from 'react';
import { connect } from 'react-redux'

import { receiveAuth, checkAuth, addDeviceName, connectSocket } from '../actions/socketlink'


class SocketLink extends React.Component {
    constructor(props){
        super(props)
        this.authState = this.props.authState;
    }
    componentDidMount() {
        if(!this.authState.devicename) {
            this.props.initAuth()
        }else{
            //socketio 연결
            //this.props.connectSocket(this.authState.devicename, this.props.socket);
        }
    }

    componentDidUpdate(prevProps) {
        console.log(this.props.authState)
        if(this.props.authState.devicename && !this.props.authState.socketID){
            let devicename = this.props.authState.devicename;
            this.props.connectSocket(devicename, this.props.socket);
        }
    }

    render() {
        if(this.props.authState.devicename){
            return (
                <div>
                    기기 확인되었습니다.
                </div>
            );
        }else{
            return (
                <div>
                    <input id="deviceNameInput" onKeyDown={(event) => this.props.deviceNameInputOnKeyDown(event)} type="text" placeholder="디바이스 이름을 입력해주세요." />
                </div>
            );
        }

    }
}


function mapStateToProps(state) {
    return {
        authState: state.authReducer
    }
}

const mapDispatchToProps = (dispatch) =>{
    let that = this;
    return{
        initAuth: () => {
            dispatch(receiveAuth());
        },
        deviceNameInputOnKeyDown:(event) =>{
            // When the client hits ENTER on their keyboard
            if (event.which === 13) {
                let devicename =  document.querySelector('#deviceNameInput').value;
                dispatch(addDeviceName(devicename));
            }
        },
        connectSocket:(devicename, socket) =>{
            console.log("?!")
            dispatch(connectSocket(devicename, socket));
        }
    }
}


SocketLink.propTypes = {
    authState: PropTypes.shape({
        loaded: PropTypes.bool.isRequired,
        loading: PropTypes.bool.isRequired,
        devicename: PropTypes.string,
        socketID: PropTypes.string
    }),
    initAuth: PropTypes.func.isRequired,
    deviceNameInputOnKeyDown: PropTypes.func.isRequired,
    connectSocket: PropTypes.func.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps)(SocketLink)