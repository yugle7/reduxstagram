import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'views/_blocks';
import { Author } from 'views/pages/article/_blocks';

import { connect } from 'react-redux';
import * as actions from 'actions/article';

const mapStateToProps = ({ article }) => ({ article: article.get('single').toJS() });
const mapDispatchToProps = dispatch => ({ getSingle: id => dispatch(actions.single(id)) });


@connect(mapStateToProps, mapDispatchToProps)
export default class ArticleSingle extends Component {
    static propTypes = {
        getSingle: PropTypes.func.isRequired,
        article: PropTypes.shape({
            title: PropTypes.string,
            content: PropTypes.string,
        }).isRequired,
    };
    componentWillMount() {
        this.props.getSingle(this.props.match.params.id);
    }
    render() {
        const { article } = this.props;
        return (
            <Row>
                <article className="article__item">
                    <Author className="article__author" {...article} />
                    <header className="article__header">{article.title}</header>
                    <section className="article__content">{article.content}</section>
                </article>
            </Row>
        );
    }
}
