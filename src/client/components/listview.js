/**
 * Created by Jaeeo on 2016. 10. 14..
 */
import { connect } from 'react-redux'
import { increment } from '../actions'
import List from './list'

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

const ListView = connect(
    mapStateToProps,
    mapDispatchToProps
)(List)

export default ListView