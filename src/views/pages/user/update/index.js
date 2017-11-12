import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Row, Input, Button } from 'views/_blocks';

import { connect } from 'react-redux';
import * as actions from 'actions/user';

import './styles.scss';

const mapStateToProps = ({ user }) => user.get('single').toJS();
const mapDispatchToProps = dispatch => ({
    getSingle: id => dispatch(actions.single(id)),
    onUpdate: (id, params) => dispatch(actions.update(id, params)),
});

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class ArticleCreate extends Component {
    static propTypes = {
        getSingle: PropTypes.func.isRequired,
        onUpdate: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }).isRequired,
        history: PropTypes.shape({ replace: PropTypes.func }).isRequired,
    };
    state = {
        name: this.props.name,
        picture: this.props.picture,
    };
    componentWillMount() {
        const { id } = this.props.match.params;
        this.props.getSingle(id);
    }
    componentWillReceiveProps(nextProps) {
        const { name, picture } = nextProps;
        if (name !== this.props.name) this.setState({ name });
        if (picture !== this.props.picture) this.setState({ picture });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const { id } = this.props.match.params;
        const { email, name, role, picture } = this.state;
        this.props.onUpdate(id, { email, name, role, picture }).then(() => this.props.history.replace('/user/list'));
    };
    handleChange = ({ value, name }) => this.setState({ [name]: value });
    render() {
        const { name, email, password, role, picture } = this.state;
        const disabled = !name || !picture || (name === this.props.name && picture === this.props.picture);
        return (
            <Row className="page-article-update">
                <form onSubmit={this.handleSubmit}>
                    <Input name="name" placeholder="Name" value={name} onChange={this.handleChange} />
                    {/* <Input name="email" placeholder="Email" value={email} onChange={this.handleChange} /> */}
                    {/* <Input name="password" placeholder="Password" value={password} onChange={this.handleChange} /> */}
                    {/* <Input name="role" placeholder="Role" value={role} onChange={this.handleChange} /> */}
                    <Input name="picture" placeholder="Avatar" value={picture} onChange={this.handleChange} />
                    <Button type="submit" name="submit" green disabled={disabled}>Update</Button>
                </form>
            </Row>
        );
    }
}
