import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';


export default class Button extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
        children: PropTypes.node,
    };

    render() {
        const { className, children, disabled, ...props } = this.props;
        const color =
            props.green && 'green' ||
            props.blue && 'blue' ||
            props.red && 'red' ||
            props.orange && 'orange' ||
            props.silver && 'silver';
        delete props[color];
        return (
            <button
                {...props}
                className={[ 'button', className, disabled && 'disabled', color ]}
                disabled={disabled}
            >
                {children}
            </button>
        );
    }
}
