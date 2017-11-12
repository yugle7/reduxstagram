import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'views/_blocks';
import './styles.scss';

export default class Head extends Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
    };

    render() {
        const { className, children, ...props } = this.props;
        return <div {...props} className={[ 'head', className ]}><Row>{children}</Row></div>;
    }
}
