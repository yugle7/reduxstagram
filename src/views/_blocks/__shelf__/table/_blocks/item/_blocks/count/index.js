import React from 'react';
import PropTypes from 'prop-types';
import { BaseComponent } from '_base';
import { countHuman } from 'helpers';
import './styles.scss';


class Count extends BaseComponent {
    render() {
        const { className, item, onClick } = this.props;
        const count = countHuman(item || 0);
        return (
            <div className={[ className, 'table__item-count' ]} onClick={onClick}>
                <div className="wrapper">
                    <div className="number_with_comma">{count[0]}</div>
                    <div className="count_text">{`${count[1]} чел.`}</div>
                </div>
            </div>
        );
    }
}

Count.propTypes = {
    item: PropTypes.number,
};

export default Count;
