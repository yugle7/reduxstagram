import React from 'react';
import PropTypes from 'prop-types';
import { BaseComponent, Icon } from '_base';
import * as icons from 'assets/icons';
import './styles.scss';

export default class TableRibbon extends BaseComponent {
    static defaultProps = {
        ribbon: [],
    };

    static propTypes = {
        ribbon: PropTypes.array,
    };

    render() {
        const { ribbon, list } = this.props;
        if (!list.length || !list.some(item => item.id.checked)) return <div className="hidden" />;
        const single = list.filter(item => item.id.checked).length === 1;
        const selected = list.filter(item => item.id.checked);
        return (
            <div className="pcs-table__panel">
                <ul className="pcs-table__panel-list">
                    {
                        ribbon.filter(Boolean).filter(i => single || !i.single).map((item, key) => {
                            const { action } = item;
                            let { icon, label = '', disabled } = item;
                            if (typeof disabled === 'function') disabled = disabled(selected);

                            const style = {};
                            if (disabled) style.opacity = 0.5;
                            else if (typeof action === 'function') style.cursor = 'pointer';
                            if (typeof icon === 'function') icon = icon(selected);
                            if (typeof label === 'function') label = label(selected);
                            return (
                                <li key={key} className="pcs-table__panel-item" onClick={() => action(selected)} style={style} >
                                    <Icon glyph={icons[icon]} />
                                    <div className="label">{label}</div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}
