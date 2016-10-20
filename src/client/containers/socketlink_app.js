import React from 'react';
import { connect } from 'react-redux'
import SockLinkView from '../components/socketlink';
import io from 'socket.io-client';

const socket = io('', { path: '/api/socketio' });

class SocketLinkApp extends React.Component {
    componentDidMount() {
        console.log(this.props);
        const {dispatch} = this.props;
    }

    render() {
        return (
            <div>
                <SockLinkView socket={socket}/>
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        environment: state.environment
    }
}

export default connect(mapStateToProps)(SocketLinkApp)
