import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import SocketLinkApp from './containers/socketlink_app';
import socketLinkReducer from './reducers/socketlink';

const socketLinkStore = createStore(socketLinkReducer);
const socketLinkElement = document.getElementById('socketLink');

ReactDOM.render(
    <Provider store = {socketLinkStore}>
        <SocketLinkApp />
    </Provider>,
    socketLinkElement
);
