import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Input, Button } from 'views/_blocks';
import './styles.scss';

@withRouter
export default class SingIn extends Component {
    static propTypes = {
        onSignIn: PropTypes.func.isRequired,
    };
    handleSignIn = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        this.props.onSignIn({ email, password }).then(() => this.props.history.replace('/home'));
    };
    handleChange = ({ value, name }) => this.setState({ [name]: value });
    render() {
        return (
            <div className="page-signin">
                <form onSubmit={this.handleSignIn}>
                    <Input type="text" name="email" title="E-mail" placeholder="input your e-mail" onChange={this.handleChange} />
                    <Input type="password" name="password" title="Password" placeholder="password" onChange={this.handleChange} />
                    <Button type="submit" name="submit" green>Sign in</Button>
                </form>
            </div>
        );
    }
}
