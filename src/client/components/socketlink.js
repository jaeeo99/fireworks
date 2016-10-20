import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import {browserHistory} from 'react-router'
import { changeTheme } from '../actions/coffee'
import { receiveAuth, checkAuth, addDeviceName, connectSocket } from '../actions/socketlink'


class SocketLink extends React.Component {
    constructor(props){
        super(props)
        this.authState = this.props.authState;
        this.onClickAllChangeTheme = props.onClickAllChangeTheme;
        this.onClickAllChicken = props.onClickAllChicken;
        this.onClickAllCoffee = props.onClickAllCoffee;
    }
    componentDidMount() {
        if(!this.authState.devicename) {
            this.props.initAuth()
        }else{
            //socketio 연결
            //this.props.connectSocket(this.authState.devicename, this.props.socket);
        }

        const { socket } = this.props;
        let that = this;
        socket.on('change template', function(msg){
            browserHistory.push('/'+msg)
        });
        socket.on('change thema', function(){
            that.props.changeThema();
        });
        socket.on('connect', function(){
            console.log("connect")
        });
        socket.on('disconnect', function(){
            console.log("disconnect!!!")
        });
    }

    componentDidUpdate(prevProps) {
        if(this.props.authState.devicename && !this.props.authState.socketID){
            let devicename = this.props.authState.devicename;
            this.props.connectSocket(devicename, this.props.socket);

        }
    }

    render() {
        let devicename = this.props.authState.devicename;
        if(devicename){
            if(devicename == "admin"){
                return (
                    <div>
                        <div className="deviceInfoBox">
                            Device Name : {devicename}
                        </div>
                        <div className="deviceAdminBox">
                            관리자 기능 <br/>
                            <button onClick={(event) => this.onClickAllChicken(this.props)}>전체 치킨메뉴</button><br/>
                            <button onClick={(event) => this.onClickAllCoffee(this.props)}>전체 커피메뉴</button><br/>
                            <button onClick={(event) => this.onClickAllChangeTheme(this.props)}>(커피)테마 변경</button>
                        </div>
                    </div>
                );
            }else{
                return (
                    <div className="deviceInfoBox">
                        Device Name : {devicename}
                    </div>
                );
            }
        }else{
            return (
                <div className="deviceInfoBox">
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
            dispatch(connectSocket(devicename, socket));
            browserHistory.push('/coffee');
        },
        changeThema:() =>{
            dispatch(changeTheme());
        },
        onClickAllChangeTheme: (props) => {
            const { socket } = props;
            socket.emit('all change thema');
        },
        onClickAllChicken: (props) =>{
            const { socket } = props;
            socket.emit('all change template', "chicken");
        },
        onClickAllCoffee: (props) =>{
            const { socket } = props;
            socket.emit('all change template', "coffee");
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