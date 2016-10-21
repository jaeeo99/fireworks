/**
 * Created by Jaeeo on 2016. 10. 13..
 */
import { combineReducers } from 'redux';
import _ from 'lodash';

const items = {
    section1:[],
    section2:[{
        id: 0,
        src: '/img/coffee/darkChocolatFranobe.png',
        name: '다크쇼콜라 프라노베',
        value: 0
    }, {
        id: 1,
        src: '/img/coffee/greenteaCitronTeaAde.png',
        name: '유자 티 에이드',
        value: 0
    }, {
        id: 2,
        src: '/img/coffee/lemonTeaAde.png',
        name: '레몬 티 에이드',
        value: 0
    }, {
        id: 3,
        src: '/img/coffee/javaChipFranobe.png',
        name: '자바칩 프라노베',
        value: 0
    }, {
        id: 4,
        src: '/img/coffee/strawberrySmoobella.png',
        name: '스무벨라 딸기',
        value: 0
    }],
    section3:['에스프레소', '아메리카노', '카페라떼', '카푸치노', '카라멜 마키아또', '모카치노', '카페모카', '바닐라 라떼', '헤이즐넛 라떼', '민트카페모카', '아포가또']
}

const seasons = {
    spring:{
        background: '#fbbbbb',
        src: '/img/coffee/grass.png',
    },
    summer:{
        background: '#008dc8',
        src: '/img/coffee/beach.png',
    },
    autumn:{
        background: '#381e0a',
        src: '/img/coffee/leaves.png',
    },
    winter:{
        background: '#00344a',
        src: '/img/coffee/winter.png',
    }
}

const theme = {
    season: 'autumn',
    resources: seasons.autumn
}

const themeReducer = (state = theme, action) =>{
    switch (action.type){
        case 'CHANGE_THEME':
            switch (state.season){
                case 'spring':
                    return Object.assign({}, state, {
                        season: 'summer',
                        resources: seasons.summer
                    });
                case 'summer':
                    return Object.assign({}, state, {
                        season: 'autumn',
                        resources: seasons.autumn
                    });
                case 'autumn':
                    return Object.assign({}, state, {
                        season: 'winter',
                        resources: seasons.winter
                    });
                case 'winter':
                    return Object.assign({}, state, {
                        season: 'spring',
                        resources: seasons.spring
                    });
                default:
                    return state;
            }
        default:
            return state;
    }
};

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

const listReducer = (state = [], action) => {
    switch(action.type) {
        case 'INCREMENT':
            return state.map(t =>
                itemReducer(t, action)
            )
        default:
            return state;
    }
}


const itemsReducer = (state = items, action) =>{
    switch (action.type){
        case 'INCREMENT':
            return Object.assign({}, state, {
                section2: listReducer(state.section2, action).sort((a, b) =>{
                    return b.value - a.value;
                })
            });
        default:
            return state;
    }
};

const coffeeOrderApp = combineReducers({
    themeReducer,
    itemsReducer
});

export default coffeeOrderApp;
export {themeReducer, itemsReducer}