import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Row, Input, TextArea, Button } from 'views/_blocks';

import { connect } from 'react-redux';
import * as actions from 'actions/article';

import './styles.scss';

const mapStateToProps = ({ article }) => article.get('single').toJS();
const mapDispatchToProps = dispatch => ({
    getSingle: id => dispatch(actions.single(id)),
    onUpdate: (id, { title, content }) => dispatch(actions.update(id, { title, content })),
});

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class ArticleCreate extends Component {
    static propTypes = {
        getSingle: PropTypes.func.isRequired,
        onUpdate: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }).isRequired,
        history: PropTypes.shape({ replace: PropTypes.func }).isRequired,
    };
    state = {
        title: this.props.title,
        content: this.props.content,
    };
    componentWillMount() {
        const { id } = this.props.match.params;
        this.props.getSingle(id);
    }
    componentWillReceiveProps(nextProps) {
        const { title, content } = nextProps;
        if (title !== this.props.title || content !== this.props.content) this.setState({ title, content });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const { id } = this.props.match.params;
        const { title, content } = this.state;
        this.props.onUpdate(id, { title, content }).then(() => this.props.history.replace('/article/list'));
    };
    handleChange = ({ value, name }) => this.setState({ [name]: value });
    render() {
        const { title, content } = this.state;
        const disabled = !title || !content || (title === this.props.title && content === this.props.content);
        return (
            <Row className="page-article-update">
                <form onSubmit={this.handleSubmit}>
                    <Input name="title" placeholder="Title" value={title} onChange={this.handleChange} />
                    <TextArea name="content" value={content} placeholder="Tell your story" onChange={this.handleChange} />
                    <Button type="submit" name="submit" green disabled={disabled}>Update</Button>
                </form>
            </Row>
        );
    }
}
