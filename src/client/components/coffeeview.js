/**
 * Created by Jaeeo on 2016. 10. 18..
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { changeTheme } from '../actions/coffee'
import { increment } from '../actions/chicken'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Coffee extends React.Component {
    constructor (props) {
        super(props);
        this.onClick = props.onClick;
        this.onItemClick = props.onItemClick;
    }
    render () {
        return (
            <main>
                <div className="bg_div">
                    <div className="bg_wrapper">
                        <ReactCSSTransitionGroup transitionName="fade"
                                                 transitionEnterTimeout={500}
                                                 transitionLeaveTimeout={500}>
                            <div key={this.props.theme.season} className={this.props.theme.season + " bg"}>
                                <img src={this.props.theme.resources.src}/>
                            </div>
                        </ReactCSSTransitionGroup>
                        <img src="/img/coffee/opticalFlare.png"/>
                        <img src="/img/coffee/coffeeDessert.png"/>
                    </div>
                </div>
                <div className="grid_menu">
                    <div className="grid_01" onClick={this.onClick}>
                    </div>
                    <div className="grid_02">
                        <div className="grid_02_relative">
                            {this.props.items.section2.map((item, index) =>
                                <div key={item.id} className={'menu_list' + (index == 0 ? ' best': ' second')}  onClick={this.onItemClick.bind(null, item.id)}>
                                    <ReactCSSTransitionGroup transitionName="fade"
                                                             transitionEnterTimeout={500}
                                                             transitionLeaveTimeout={500}>
                                        <div key={item.id} className="transition_wrapper">
                                            <div className="menu_list_wrapper">
                                                <img className="menu_img" src={item.src}/>
                                                <span className="menu_name">{item.name}</span>
                                                <span className="menu_price">R 4,300 / L 5,500</span>
                                                <div className="menu_rank">
                                                    {(() => {
                                                        switch (index) {
                                                            case 0:
                                                                return <img src="/img/coffee/first.png"/>
                                                            case 1:
                                                                return <img src="/img/coffee/second.png"/>
                                                            case 2:
                                                                return <img src="/img/coffee/third.png"/>
                                                            default:
                                                                return <div className="unrank"></div>
                                                        }
                                                    })()}
                                                    <span className="menu_ordered">{item.value}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </ReactCSSTransitionGroup>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid_03">
                        <div className="grid_03_relative">
                            <div className="menu_list_nobg">
                                <span className="espressoCoffee">ESPRESSO COFFEE</span>
                            </div>
                            {this.props.items.section3.map((item, index) =>
                                <div key={index} className="menu_list">
                                    <div className="menu_list_wrapper">
                                        <span className="menu_name">{item}</span>
                                        <span className="menu_price">R 4,300 / L 5,500</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

Coffee.propTypes = {
    items: PropTypes.shape({
        section1: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        section2: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            src: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired
        }).isRequired).isRequired,
        section3: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
    }),
    theme: PropTypes.shape({
        season: PropTypes.string.isRequired,
        resources: PropTypes.shape({
            background: PropTypes.string.isRequired,
            src: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        theme: state.themeReducer,
        items: state.itemsReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => {
            dispatch(changeTheme())
        },
        onItemClick: (id) => {
            dispatch(increment(id))
        }
    }
}

const CoffeeView = connect(
    mapStateToProps,
    mapDispatchToProps
)(Coffee)

export default CoffeeView