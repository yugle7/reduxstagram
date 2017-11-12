import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '_base';
import { sortSVG } from 'assets/icons';
import './styles.scss';

// import { saveTableFilters } from 'stores/utils';

export default class Sorting extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        tableName: PropTypes.string,
        fieldName: PropTypes.any,

        // func(order)
        onSort: PropTypes.func,
    }

    static contextTypes = {
        store: PropTypes.object,
    }

    constructor(props) {
        super(props);

        this.state = {
            order: 0, // 0 - no sort, 1 - ascending, 2 - descending
        };
    }

    componentDidMount() {
        const { tableName, fieldName } = this.props;
        if (typeof (fieldName) === 'string' && !!tableName && !!this.context.store) {
            const thisTableFilters = this.context.store.getState().utils.get('tableFilters').get(tableName) || {};
            const order = thisTableFilters[fieldName] || 0;
            this.state.order = order;

            // too good arch
            if (order !== 0) {
                setTimeout(() => {
                    this.event('onSort', order);
                }, 50);
            }
        }
    }

    render() {
        const { className } = this.props;
        const { order } = this.state;

        return (
            <div
                className={[ className, 'pcs-sorting' ]}
                onClick={this.handleClick}
            >
                { order !== 2 && <Icon className="ascending" glyph={sortSVG} /> }
                { order !== 1 && <Icon className="descending" glyph={sortSVG} /> }
            </div>
        );
    }

    handleClick = () => {
        const order = (this.state.order + 1) % 3;
        this.setState({ order });
        this.event('onSort', order);

        const { tableName, fieldName } = this.props;
        // if (tableName) { this.context.store.dispatch(saveTableFilters(tableName, { [fieldName]: order })); }
    }
}
