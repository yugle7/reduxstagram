import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';


export default class TextArea extends Component {
    static propTypes = {
        className: PropTypes.string,
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        onChange: PropTypes.func,
    };
    static defaultProps = {
        onChange: () => {},
    };
    get value() { return this.$textarea.value; }
    set value(value) { this.$textarea.value = value; }

    handleChange = e => this.props.onChange(e.target);

    render() {
        const { onChange, ...props } = this.props;
        return (
            <div className={[ 'text-area', props.disabled && 'disabled', props.readOnly && 'readonly' ]}>
                <textarea {...props} ref={(r) => { this.$textarea = r; }} onChange={this.handleChange} />
            </div>
        );
    }
}
