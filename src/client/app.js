/**
 * Created by Jaeeo on 2016. 10. 19..
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';

import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { itemsReducer, themeReducer } from './reducers/coffee'
import { listReducer } from './reducers/chicken'
import { authReducer } from './reducers/socketlink';
import { voteReducer } from './reducers/vote'
import CoffeeApp from './containers/coffee_app'
import CoffeeVideoApp from './containers/coffeevideo_app'
import CoffeeDivisionApp from './containers/coffeedivision_app'
import ChickenApp from './containers/chicken_app'
import SocketLinkApp from './containers/socketlink_app'
import VoteApp from './containers/vote_app'

const element = document.getElementById('app');

const store = createStore(
    combineReducers({
        itemsReducer,
        themeReducer,
        listReducer,
        authReducer,
        voteReducer,
        routing: routerReducer
    })
)

const routes = (
    <Route path="/" component={SocketLinkApp}>
        <Route path="/chicken" component={ChickenApp} />
        <Route path="/coffee" component={CoffeeApp} />
        <Route path="/vote" component={VoteApp} />
        <Route path="/coffee/video" component={CoffeeVideoApp} />
        <Route path="/coffee/division" component={CoffeeDivisionApp}/>
    </Route>
);

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} children={routes}>
            {/*<Route path="/connect" />*/}
        </Router>
    </Provider>,
    element
);