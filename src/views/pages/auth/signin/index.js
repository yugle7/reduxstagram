import { connect } from 'react-redux';
import * as actions from 'actions/auth';
import Template from './template';

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch => ({
    onSignIn: ({ email, password }) => dispatch(actions.signIn({ email, password })),
});


export default connect(mapStateToProps, mapDispatchToProps)(Template);

