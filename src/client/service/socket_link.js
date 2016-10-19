/**
 * Created by EunSeokOh on 2016. 10. 17..
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider  } from 'react-redux';
import App from './components/app';
import doorderApp from './reducers';
import io from 'socket.io-client';

const store = createStore(doorderApp);
const appElement = document.getElementById('app');
const socket = io('', { path: '/api/chat' });

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    appElement
);


