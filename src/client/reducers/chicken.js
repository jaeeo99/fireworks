/**
 * Created by Jaeeo on 2016. 10. 13..
 */
import { combineReducers } from 'redux';

let names = ['고추간장치킨', '깐부가라', '마늘전기구이', '바삭한식스팩', '불사조치킨', '순살크리스피', '순살파닭', '순살떢볶이', '순살스윗치킨', '전기구이치킨', '크리스피치킨', '후라이드치킨'];
const itemList = [];

for(let i = 0 ; i < names.length ; i++){
    itemList.push({
        id: i,
        name: names[i],
        src: '/img/chicken/' + i + '.png',
        value: 0,
        new_item: false,
        hot_item: false,
    });
}

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

const listReducer = (state = itemList, action) =>{
    switch (action.type){
        case 'INCREMENT':
            return state.map(t =>
                itemReducer(t, action)
            )
        default:
            return state;
    }
};

const chickenOrderApp = combineReducers({
    listReducer
});

export default chickenOrderApp;
