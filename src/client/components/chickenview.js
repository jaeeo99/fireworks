/**
 * Created by Jaeeo on 2016. 10. 19..
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { increment } from '../actions/chicken'

class Chicken extends React.Component {
    constructor (props) {
        super(props);
        this.onClick = props.onClick;
    }
    render () {
        return (
            <main>
                {this.props.list.map(item =>
                    <div key={item.id} className="slot"
                         onClick={ this.onClick.bind(null, item.id) }>
                        <div className={'slot-header' + ' ' + ((item.value > 10) ? 'fire' : null)}>
                            <img src={ item.src } className="image" />
                        </div>
                        <div className="slot-footer">
                            <div>{ item.name } { item.value }</div>
                        </div>
                    </div>
                )}
            </main>
        )
    }
}

Chicken.propTypes = {
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


const mapStateToProps = (state) => {
    return {
        list: state.listReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (id) => {
            dispatch(increment(id))
        }
    }
}

const ChickenView = connect(
    mapStateToProps,
    mapDispatchToProps
)(Chicken)

export default ChickenView