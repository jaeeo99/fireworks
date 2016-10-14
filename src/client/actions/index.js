/**
 * Created by Jaeeo on 2016. 10. 13..
 */
export const increment = (id) => {
    return {
        type: 'INCREMENT',
        id
    };
}

export const setFilter = (filter) => {
    return {
        type: 'SET_FILTER',
        filter
    }
}
