/**
 * Created by Jaeeo on 2016. 10. 13..
 */
import { combineReducers } from 'redux';

const items = {
    section1:[],
    section2:['다크쇼콜라 프라노베', '그린티 & 유자티 에이드', '얼그레이 & 레몬티 에이드', '아이스 아메리카노', '자바칩 프라노베', '스무벨라 딸기', '미니 허니브레드.카라', '컬러 베이글'],
    section3:['에스프레소', '아메리카노', '카페라떼', '카푸치노', '카페모카', '카라멜 라떼', '민트모카', '카라멜 마끼아또', '바닐라 라떼', '고구마 라떼', '샤케라또']
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
    season: 'spring',
    resources: seasons.spring
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

const itemsReducer = (state = items, action) =>{
    return state;
}


const coffeeOrderApp = combineReducers({
    themeReducer,
    itemsReducer
});

export default coffeeOrderApp;
