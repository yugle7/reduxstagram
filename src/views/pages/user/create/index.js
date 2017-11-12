import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Row, Input, Button } from 'views/_blocks';

import { connect } from 'react-redux';
import * as actions from 'actions/user';

import './styles.scss';

const mapDispatchToProps = dispatch => ({ onCreate: params => dispatch(actions.create(params)) });

@withRouter
@connect(null, mapDispatchToProps)
export default class ArticleCreate extends Component {
    static propTypes = {
        onCreate: PropTypes.func.isRequired,
        history: PropTypes.shape({ replace: PropTypes.func }).isRequired,
    };
    state = {
        name: undefined,
        email: '',
        password: '',
        role: undefined,
        picture: undefined,
    };
    handleSubmit = (event) => {
        event.preventDefault();
        const { name, email, password, role, picture } = this.state;
        this.props.onCreate({ name, email, password, role, picture }).then(() => this.props.history.replace('/user/list'));
    };
    handleChange = ({ value, name }) => this.setState({ [name]: value });
    render() {
        const disabled = !this.state.email || !this.state.password;
        return (
            <Row className="page-user-create">
                <form onSubmit={this.handleSubmit}>
                    <Input name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                    <Input name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                    <Input name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                    <Input name="role" placeholder="Role" value={this.state.role} onChange={this.handleChange} />
                    <Input name="picture" placeholder="Avatar" value={this.state.picture} onChange={this.handleChange} />
                    <Button type="submit" name="submit" green disabled={disabled}>Publish</Button>
                </form>
            </Row>
        );
    }
}
