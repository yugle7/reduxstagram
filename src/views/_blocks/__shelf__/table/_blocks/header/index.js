import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Sorting from './_blocks/sorting';
import Searching from './_blocks/search';
import './styles.scss';


class Cell extends PureComponent {
    render() {
        const {
            className, item, onSort, onSearch, tableName,
        } = this.props;
        return (
            <div
                className={[ className, 'pcs-table__header-item' ]}
                style={item.style}
            >
                {item.search &&
                <Searching onSearch={onSearch} fieldName={item.children} tableName={tableName} placeholder={item.children} /> ||
                <span>{item.children}</span>
                }
                {item.sorted && <Sorting ref="sort" onSort={onSort} fieldName={item.children} tableName={tableName} />}
            </div>
        );
    }
}

export default class ListHeader extends PureComponent {
    static defaultProps = {
        header: { id: {} },
        onSort: () => {},
        onSearch: () => {},
    };

    static propTypes = {
        header: PropTypes.shape({
            name: PropTypes.shape({
                name: PropTypes.string,
                len: PropTypes.number,
                type: PropTypes.string,
            }),
        }),
        onSort: PropTypes.func,
        onSearch: PropTypes.func,
        tableName: PropTypes.string,
    };

    render() {
        const {
            header, onSort, onSearch, tableName,
        } = this.props;

        return (
            <div className="tr pcs-table__header">
                {
                    Object.keys(header).map(key => (
                        <Cell
                            className="td"
                            ref={key}
                            key={key}
                            item={header[key]}
                            onSort={onSort(key)}
                            onSearch={onSearch(key)}
                            tableName={tableName}
                        />
                    ))
                }
            </div>
        );
    }

    // костыль: затираем все сортировки, кроме field
    handleResetSort = (field) => {
        console.log('handleResetSort', field);
        Object.keys(this.props.header)
            .filter(key => key !== field)
            .forEach(key => this.refs[key].refs.sort && this.refs[key].refs.sort.setState({ order: 0 })); // handleResetSort());
    }
}
