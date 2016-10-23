import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import {browserHistory} from 'react-router'
import { changeTheme } from '../actions/coffee'
import { increment } from '../actions/chicken'
import { receiveAuth, checkAuth, addDeviceName, connectSocket } from '../actions/socketlink'


class SocketLink extends React.Component {
    constructor(props){
        super(props)
        this.authState = this.props.authState;
        this.onClickAllChangeTheme = props.onClickAllChangeTheme;
        this.onClickAllVideoView = props.onClickAllVideoView;
        this.onClickAllChicken = props.onClickAllChicken;
        this.onClickAllCoffee = props.onClickAllCoffee;
        this.onCLickAllDivideVideo = props.onCLickAllDivideVideo;
        this.onCLickAllOrderMenu = props.onCLickAllOrderMenu;

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
            that.props.changeTheme();
        });
        socket.on('connect', function(){
            console.log("connect")
        });
        socket.on('change menu count', function(data){
            that.props.increment(data);
        });
        //force disconnect 현재 동작 안함
        socket.on('force disconnect', function(){
            location.reload()
        });
        socket.on('disconnect', function(){
            console.log("disconnect")
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
                            템플릿 변경 <br/>
                            <button onClick={(event) => this.onClickAllChicken(this.props)}>전체 치킨메뉴</button>
                            <button onClick={(event) => this.onClickAllCoffee(this.props)}>전체 커피메뉴</button><br/>
                            <button onClick={(event) => this.onClickAllVideoView(this.props)}>전체 커피영상</button>
                            <button onClick={(event) => this.onCLickAllDivideVideo(this.props)}>전체 분할영상</button><br/>
                            <button onClick={(event) => this.onClickAllChangeTheme(this.props)}>커피 테마변경</button><br/><br/>

                            커피매뉴 주문 <br/>
                            <button onClick={(event) => this.onCLickAllOrderMenu(this.props,0)}>다크쇼콜라</button>
                            <button onClick={(event) => this.onCLickAllOrderMenu(this.props,1)}>유자칩</button>
                            <button onClick={(event) => this.onCLickAllOrderMenu(this.props,2)}>레몬티</button><br/>
                            <button onClick={(event) => this.onCLickAllOrderMenu(this.props,3)}>자바칩</button>
                            <button onClick={(event) => this.onCLickAllOrderMenu(this.props,4)}>스무벨라</button>
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
        changeTheme:() =>{
            dispatch(changeTheme());
        },
        increment:(index)=>{
            dispatch(increment(index));
        },
        onClickAllChangeTheme: (props) => {
            const { socket } = props;
            socket.emit('all change thema');
        },
        onClickAllVideoView:( props ) =>{
            const { socket } = props;
            socket.emit('all change template', "coffee/video")
        },
        onClickAllChicken: (props) =>{
            const { socket } = props;
            socket.emit('all change template', "chicken");
        },
        onClickAllCoffee: (props) =>{
            const { socket } = props;
            socket.emit('all change template', "coffee");
        },
        onCLickAllDivideVideo: (props) =>{
            const { socket } =props;
            socket.emit('all change template', "coffee/division")
        },
        onCLickAllOrderMenu:(props,index) => {
            const { socket } =props;
            socket.emit('all order menu', index)
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