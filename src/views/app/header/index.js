import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'actions/auth';
import LogOutSVG from 'assets/svg/logout.svg';
import './styles.scss';


const mapStateToProps = ({ auth, user }) => ({ user: user.get('me').toJS().id ? user.get('me').toJS() : auth.get('me').toJS() });
const mapDispatchToProps = dispatch => ({ signOut: () => dispatch(actions.signOut(dispatch)) });

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        user: PropTypes.shape({
            name: PropTypes.string,
            picture: PropTypes.string,
        }).isRequired,
        signOut: PropTypes.func.isRequired,
        history: PropTypes.shape({ push: PropTypes.func }).isRequired,
        location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
    };
    handleSignOut = () => this.props.signOut().then(() => this.props.history.push('/signin'));

    render() {
        const { className, user, location, ...props } = this.props;
        const active = location.pathname;
        return (
            <header id={props.id} className={[ 'header', className ]}>
                <ul className="menu">
                    <MenuItem to="/home" active={active}>Home</MenuItem>
                    <MenuItem to="/roster" active={active}>Roster</MenuItem>
                    <MenuItem to="/schedule" active={active}>Schedule</MenuItem>
                    <MenuItem to="/article/list" active={active}>Articles</MenuItem>
                    <MenuItem to="/user/list" active={active}>Users</MenuItem>
                </ul>
                <div className="user" hidden={user.role === 'anonymous'}>
                    <div className="user__name">{user.name}</div>
                    <img src={user.picture} alt="ʕ•ᴥ•ʔ" />
                    <LogOutSVG className="user__logout" onClick={this.handleSignOut} />
                </div>
                <ul className="menu right" hidden={user.role !== 'anonymous'}>
                    <MenuItem to="/signin" active={active}>Sign In</MenuItem>
                </ul>
            </header>
        );
    }
}

const MenuItem = ({ className, onClick, active, ...props }) => (
    <li className={[ className, active.startsWith(props.to) && 'active' ]}>
        <Link {...props} />
    </li>
);
MenuItem.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    active: PropTypes.string,
    to: PropTypes.string,
};
