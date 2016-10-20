/**
 * Created by Jaeeo on 2016. 10. 13..
 */
import { combineReducers } from 'redux';

const votes = [{
    id: 0,
    title: 'voteA',
    value: 0
},{
    id: 1,
    title: 'voteB',
    value: 0
}]


const itemReducer = (state = {}, action) => {
    switch(action.type) {
        case 'INCREMENT':
            if (state.id !== action.id) {
                return state
            }
            return Object.assign({}, state, {
                value: state.value + 1
            });
        default:
            return state;
    }
};

const voteReducer = (state = votes, action) =>{
    switch (action.type){
        case 'INCREMENT':
            return state.map(t =>
                itemReducer(t, action)
            )
        default:
            return state;
    }
};

const voteOrderApp = combineReducers({
    voteReducer
});

export default voteOrderApp;

export {voteReducer};
