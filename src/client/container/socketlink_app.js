import React from 'react';
import SockLinkView from '../components/socketlink';
import io from 'socket.io-client';

const socket = io('', { path: '/api/socketio' });

const SocketLinkApp = () => (
    <div>
        <SockLinkView socket={socket}/>
    </div>
)

export default SocketLinkApp