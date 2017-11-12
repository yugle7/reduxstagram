import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Row, Button } from 'views/_blocks';
import { Author } from 'views/pages/article/_blocks';
import PenSVG from 'assets/svg/pen.svg';
import TrashSVG from 'assets/svg/trash.svg';
import PlusSVG from 'assets/svg/plus.svg';

import { connect } from 'react-redux';
import * as actions from 'actions/article';
import './styles.scss';

const mapStateToProps = ({ article }) => ({ list: article.get('list').toJS() });
const mapDispatchToProps = dispatch => ({
    getList: () => dispatch(actions.list()),
    remove: id => dispatch(actions.remove(id)),
});

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class ArticleList extends Component {
    static propTypes = {
        getList: PropTypes.func.isRequired,
        remove: PropTypes.func.isRequired,
        list: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            content: PropTypes.string,
        })).isRequired,
    };
    componentWillMount() {
        this.props.getList();
    }
    handleClick = link => (e) => { e.stopPropagation(); this.props.history.push(link); };
    handleRemove = id => (e) => { e.stopPropagation(); this.props.remove(id); };
    render() {
        const { list } = this.props;
        return (
            <Row className="article__list">
                {
                    list.map(article => (
                        <article className="article__item" key={article.id} onClick={this.handleClick(`/article/item/${article.id}`)}>
                            <header className="article__header">{article.title}</header>
                            <section className="article__content">{article.content}</section>
                            <Author className="article__author" {...article} />
                            <div className="article__actions">
                                <PlusSVG onClick={this.handleClick('/article/create')} />
                                <PenSVG onClick={this.handleClick(`/article/item/${article.id}/update`)} />
                                <TrashSVG onClick={this.handleRemove(article.id)} />
                            </div>
                        </article>
                    ))
                }
            </Row>
        );
    }
}
