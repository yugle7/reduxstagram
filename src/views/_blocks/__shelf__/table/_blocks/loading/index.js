import React from 'react';
import PropTypes from 'prop-types';
import { BaseComponent, Icon } from '_base';
import { loadingSVG } from 'assets/icons';

import './styles.scss';

class ListLoading extends BaseComponent {
    render() {
        const { loading } = this.props;
        return <Icon glyph={loadingSVG} className={[ 'pcs-table__loading', !loading && 'hidden' ]} />;
    }
}

ListLoading.propTypes = {
    loading: PropTypes.bool,
};

export default ListLoading;
