import React from 'react';
import PropTypes from 'prop-types';
import { BaseComponent } from '_base';
import { Element } from './_blocks';

import './styles.scss';

class Cell extends BaseComponent {
    render() {
        const { head } = this.props;
        switch (head.cell) {
            case 'checkbox': return <Element.Checkbox {...this.props} />;
            case 'label': return <Element.Label {...this.props} />;
            case 'list': return <Element.List {...this.props} />;
            case 'date': return <Element.Date {...this.props} />;
            case 'count': return <Element.Count {...this.props} />;
            case 'datetime': return <Element.Datetime {...this.props} />;

            default: {
                if (typeof head.cell === 'function') {
                    return (head.cell.prototype instanceof React.Component || head.cell.prototype instanceof BaseComponent) ?
                        React.createElement(head.cell, this.props) :
                        head.cell(this.props);
                } // customTypes && (head.type in customTypes) && customTypes[head.type].render({ header, item })

                if (typeof head.cell === 'object') {
                    const item = head.cell[this.props.item];
                    return <Element.Label {...this.props} item={item} />;
                }
                return null;
            }
        }
    }
}
class Row extends BaseComponent {
    constructor() {
        super();

        this.bindMethods(`
            handleClick
        `);
    }

    render() {
        const {
            header, item, selected, tableProps,
        } = this.props;

        return (
            <div className={[ 'tr', 'pcs-table__item', selected && 'selected' ]}>
                {
                    Object.keys(header).map(key =>
                        (<Cell
                            className="td"
                            key={key}
                            head={header[key]}
                            item={item[key]}
                            row={item}
                            onClick={this.handleClick}
                            tableProps={tableProps}
                        />))
                }
            </div>
        );
    }

    handleClick() {
        const { onClick, item } = this.props;
        if (typeof onClick === 'function') onClick(item.id.name || item.id);
    }
}

Row.propTypes = {
    onClick: PropTypes.func,
    header: PropTypes.shape({
        name: PropTypes.shape({
            name: PropTypes.string,
            len: PropTypes.number,
            type: PropTypes.string,
        }),
    }),
    item: PropTypes.any,
};

export default Row;
