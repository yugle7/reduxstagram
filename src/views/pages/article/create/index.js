import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Row, Input, TextArea, Button } from 'views/_blocks';

import { connect } from 'react-redux';
import * as actions from 'actions/article';

import './styles.scss';

const mapDispatchToProps = dispatch => ({ onCreate: ({ title, content }) => dispatch(actions.create({ title, content })) });

@withRouter
@connect(null, mapDispatchToProps)
export default class ArticleCreate extends Component {
    static propTypes = {
        onCreate: PropTypes.func.isRequired,
        history: PropTypes.shape({ replace: PropTypes.func }).isRequired,
    };
    state = {
        title: '',
        content: '',
    };
    handleSubmit = (event) => {
        event.preventDefault();
        const { title, content } = this.state;
        this.props.onCreate({ title, content }).then(() => this.props.history.replace('/article/list'));
    };
    handleChange = ({ value, name }) => this.setState({ [name]: value });
    render() {
        const disabled = !this.state.title || !this.state.content;
        return (
            <Row className="page-article-create">
                <form onSubmit={this.handleSubmit}>
                    <Input name="title" placeholder="Title" value={this.state.title} onChange={this.handleChange} />
                    <TextArea name="content" placeholder="Tell your story" onChange={this.handleChange} />
                    <Button type="submit" name="submit" green disabled={disabled}>Publish</Button>
                </form>
            </Row>
        );
    }
}
