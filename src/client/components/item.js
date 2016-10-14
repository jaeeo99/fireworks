/**
 * Created by Jaeeo on 2016. 10. 14..
 */
import React, { PropTypes } from 'react';

const Item = ({ name, src, value, new_item, hot_item, onClick }) => (
    <div className="slot"
         onClick={ onClick }>
        <div className="slot-header">
            <img src={ src } className="img-chicken"/>
        </div>
        <div className="slot-footer">
            <div>{ name }{ value }</div>
        </div>
    </div>
)

Item.propTypes = {
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    new_item: PropTypes.bool.isRequired,
    hot_item: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Item;