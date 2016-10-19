/**
 * Created by Jaeeo on 2016. 10. 18..
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { changeTheme } from '../actions/coffee'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Coffee extends React.Component {
    constructor (props) {
        super(props);
        this.onClick = props.onClick;
    }
    render () {
        return (
            <main onClick={()=>console.log(this.props)}>
                <div className="bg_div">
                    <div className="bg_wrapper">
                        <ReactCSSTransitionGroup transitionName="fade"
                                                 transitionEnterTimeout={300}
                                                 transitionLeaveTimeout={300}>
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
                                <div key={index} className="menu_list">
                                    <div className={'menu_list_wrapper' + (index == 0 ? ' best': '') + (index == 1 ? ' second': '') + (index == 2 ? ' third': '')}>
                                        {(index == 0) ? <img src="/img/coffee/darkchocola.png"/>: null}
                                        {(index == 1) ? <img src="/img/coffee/greentea.png"/>: null}
                                        <span className="menu_name">{item}</span>
                                        <span className="menu_price">R 4,300 / L 5,500</span>
                                    </div>
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
        section2: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
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
        onClick: (id) => {
            dispatch(changeTheme())
        }
    }
}

const CoffeeView = connect(
    mapStateToProps,
    mapDispatchToProps
)(Coffee)

export default CoffeeView