import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '_base';
import { searchSVG } from 'assets/icons';
import { InputValidate } from '_blocks';
import './styles.scss';

// import { saveTableSearcherFilters } from 'stores/utils';

export default class Searching extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        placeholder: PropTypes.string,
        search: PropTypes.bool,
        tableName: PropTypes.string,
        fieldName: PropTypes.any,
    };

    static contextTypes = {
        store: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
            search: false,
            storedSearchValue: '',
        };
    }

    componentDidMount() {
        // todo make refactoring or delete
        // too good arch
        setTimeout(() => {
            const { tableName, fieldName, search } = this.props;
            if (search && !!tableName && typeof fieldName === 'string' && !!this.context.store) {
                const tableSearchers = this.context.store.getState().utils.get('tableSearcherFilters').get(tableName) || {};
                const searcherValue = tableSearchers[fieldName];
                if (searcherValue && searcherValue.trim() !== '') {
                    this.state.storedSearchValue = searcherValue;
                    this.state.search = true;
                    this.event('onSearch', searcherValue);
                }
            }
        }, 50);
    }

    render() {
        const { className, placeholder, search } = this.props;
        if (!this.state.search) return <span className="searcher" onClick={this.handleClick}>{placeholder} <Icon glyph={searchSVG} /></span>;
        return (
            <InputValidate
                ref="search"
                pattern={/.*/}
                placeholder={placeholder}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={this.state.storedSearchValue}
                maxLength={40}
            />
        );
    }

    handleClick = () => {
        this.setState({ search: true });
    };

    handleChange = (value) => {
        const { tableName, fieldName } = this.props;

        this.event('onSearch', value);
        if (!!tableName && !!fieldName && typeof fieldName === 'string') {
            // this.context.store.dispatch(saveTableSearcherFilters(tableName, { [fieldName]: value }));
        }
    };

    handleBlur = () => {
        if (this.refs.search.value) return;
        this.setState({ search: false });
    };
}
