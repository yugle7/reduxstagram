import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Row } from 'views/_blocks';
import PenSVG from 'assets/svg/pen.svg';
import TrashSVG from 'assets/svg/trash.svg';
import PlusSVG from 'assets/svg/plus.svg';

import { connect } from 'react-redux';
import * as actions from 'actions/user';
import './styles.scss';

const mapStateToProps = ({ user }) => ({ list: user.get('list').toJS() });
const mapDispatchToProps = dispatch => ({
    getList: params => dispatch(actions.list(params)),
    remove: id => dispatch(actions.remove(id)),
});

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class UserList extends Component {
    static propTypes = {
        getList: PropTypes.func.isRequired,
        remove: PropTypes.func.isRequired,
        list: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            content: PropTypes.string,
        })).isRequired,
    };
    componentWillMount() {
        this.props.getList({ fields: 'picture,name' }); // createdAt,role,email
    }
    handleClick = link => (e) => { e.stopPropagation(); this.props.history.push(link); };
    handleRemove = id => (e) => { e.stopPropagation(); this.props.remove(id); };
    render() {
        const { list } = this.props;
        return (
            <Row className="user__list">
                {
                    list.map(user => (
                        <div key={user.id} className="user__item">
                            <div className="user__avatar"><img src={user.picture} alt="ツ" /></div>
                            <div className="user__name">{user.name}</div>
                            <div className="user__role">{user.role}</div>
                            <div className="user__actions">
                                <PlusSVG onClick={this.handleClick('/user/create')} />
                                <PenSVG onClick={this.handleClick(`/user/item/${user.id}/update`)} />
                                <TrashSVG onClick={this.handleRemove(user.id)} />
                            </div>
                        </div>
                    ))
                }
            </Row>
        );
    }
}
