/**
 * Created by Jaeeo on 2016. 10. 13..
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider  } from 'react-redux';
import App from './components/app';
import doorderApp from './reducers';

const store = createStore(doorderApp);
const appElement = document.getElementById('app');

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    appElement
);
