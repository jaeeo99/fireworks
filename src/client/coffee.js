/**
 * Created by Jaeeo on 2016. 10. 18..
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import CoffeeApp from './container/coffee_app';
import coffeeOrderApp from './reducers/coffee';

const coffeeStore = createStore(coffeeOrderApp);
const coffeeElement = document.getElementById('coffeeApp');

ReactDOM.render(
    <Provider store = {coffeeStore}>
        <CoffeeApp />
    </Provider>,
    coffeeElement
);
