/**
 * Created by Jaeeo on 2016. 10. 13..
 */
import React, { PropTypes } from 'react';
import Item from './item';

const List = ({ list, onClick }) => (
    <main>
        {list.map(item =>
            <Item
                key={item.id}
                {...item}
                onClick={() => onClick(item.id)}
            />
        )}
    </main>
)

List.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        new_item: PropTypes.bool.isRequired,
        hot_item: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    onClick: PropTypes.func.isRequired
}

export default List;