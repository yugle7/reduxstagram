import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

// (ノ・∀・)ノ (ᵔᴥᵔ) ʕ•ᴥ•ʔ

const formatDate = (timestamp) => {
    const d = new Date(timestamp);
    const monthList = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ];
    const month = monthList[d.getMonth()];
    const year = d.getFullYear();
    const dd = d.getDate();
    const hh = `0${d.getHours()}`.slice(-2);
    const mm = `0${d.getHours()}`.slice(-2);

    return `${month} ${dd}, ${year} [ ${hh}:${mm} ]`;
};

export default class Author extends Component {
    static propTypes = {
        className: PropTypes.string,
        createdAt: PropTypes.string.isRequired,
        user: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            picture: PropTypes.string,
        }).isRequired,
    };
    render() {
        const { className, user, createdAt } = this.props;
        return (
            <div className={[ className, 'article-author' ]}>
                <div className="article-author__avatar"><img src={user.picture} alt="ツ" /></div>
                <div className="article-author__name">{user.name}</div>
                <div className="article-author__created">Published on {formatDate(createdAt)}</div>
            </div>
        );
    }
}
