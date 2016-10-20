/**
 * Created by Jaeeo on 2016. 10. 19..
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';

import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { itemsReducer, themeReducer } from './reducers/coffee'
import { listReducer } from './reducers/chicken'
import CoffeeApp from './containers/coffee_app'
import ChickenApp from './containers/chicken_app'

const element = document.getElementById('app');

const store = createStore(
    combineReducers({
        itemsReducer,
        themeReducer,
        listReducer,
        routing: routerReducer
    })
)

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/chicken" component={ChickenApp} />
            <Route path="/coffee" component={CoffeeApp} />
        </Router>
    </Provider>,
    element
);