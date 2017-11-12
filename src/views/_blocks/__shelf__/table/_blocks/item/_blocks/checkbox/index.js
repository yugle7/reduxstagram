import React from 'react';
import PropTypes from 'prop-types';
import { BaseComponent } from '_base';
import { CheckBox } from '_blocks';
import './styles.scss';


export default class Checkbox extends BaseComponent {
    static propTypes = {
        item: PropTypes.shape({
            name: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            checked: PropTypes.bool,
        }),
    };
    render() {
        const { className, head, item } = this.props;

        return (
            <div className={[ className, 'table__item-checkbox' ]}>
                <CheckBox onChange={head.onChange(item.name)} checked={item.checked} />
            </div>
        );
    }
}
