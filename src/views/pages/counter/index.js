import { connect } from 'react-redux';
import * as actions from 'actions/counter';
import Template from './template';

const mapStateToProps = ({ counter }) => ({ counter });
const mapDispatchToProps = dispatch => ({
    onIncrement: () => dispatch(actions.increment()),
    onDecrement: () => dispatch(actions.decrement()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Template);

