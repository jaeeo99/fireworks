/**
 * Created by Jaeeo on 2016. 10. 13..
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider  } from 'react-redux';
import ChickenApp from './container/chicken_app';
import chickenOrderApp from './reducers/chicken';

const chickenStore = createStore(chickenOrderApp);
const chickenElement = document.getElementById('chickenApp');

ReactDOM.render(
    <Provider store = {chickenStore}>
        <ChickenApp />
    </Provider>,
    chickenElement
);
