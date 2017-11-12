import React from 'react';
import PropTypes from 'prop-types';
import { BaseComponent } from '_base';
import { toLocaleDateString } from 'helpers/time';
import './styles.scss';


export default class Date extends BaseComponent {
    static propTypes = {
        item: PropTypes.number,
    };
    render() {
        const { className, item, onClick } = this.props;

        return (
            <div className={[ className, 'table__item-date' ]} onClick={onClick}>
                <span>{toLocaleDateString(item)}</span>
            </div>
        );
    }
}
