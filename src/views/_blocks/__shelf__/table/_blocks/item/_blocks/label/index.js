import React from 'react';
import PropTypes from 'prop-types';
import { BaseComponent } from '_base';
import './styles.scss';


export default class Label extends BaseComponent {
    static propTypes = {
        item: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.object,
        ]),
    };
    render() {
        const { className, head, onClick } = this.props;
        let { item } = this.props;

        if (item === null) item = { name: '', style: {} };
        else if (typeof item !== 'object') item = { name: item, style: {} };

        return (
            <div className={[ className, head.className, 'table__item-label' ]} onClick={onClick} style={item.style}>
                <span>{item.name}&nbsp;</span>
            </div>
        );
    }
}
