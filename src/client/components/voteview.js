/**
 * Created by Jaeeo on 2016. 10. 19..
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { increment } from '../actions/vote'
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


class Vote extends React.Component {
    constructor (props) {
        super(props);
        this.onClick = props.onClick;
    }
    render () {
        return (
            <main>
                {this.props.votes.map((item, index) =>
                    <div key={item.id} className={"section vote"+index}
                         onClick={ this.onClick.bind(null, item.id) }>
                        <div className="vote_header">
                            <div className="vote_title">
                                <span>{item.title}</span>
                            </div>
                            <div className="vote_value">
                                <span>{item.value}</span>
                            </div>
                        </div>
                        <div className="vote_content">
                            {_.range(item.value).map(idx =>
                                <div key={idx} className="voted"></div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        )
    }
}

Vote.propTypes = {
    votes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired
    }).isRequired).isRequired,
    onClick: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
    return {
        votes: state.voteReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (id) => {
            dispatch(increment(id))
        }
    }
}

const VoteView = connect(
    mapStateToProps,
    mapDispatchToProps
)(Vote)

export default VoteView