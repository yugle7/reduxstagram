import React, { Component } from 'react';
import DropDownTagging from './index';

const parse = (value) => {
    try {
        return JSON.parse(value);
    } catch (e) {
        return {};
    }
};

const list = {
    rabbit: 'Кролик',
    wolf: 'Волк',
    torture: 'Черепаха',
    monkey: 'Обезьяна',
    seagull: 'Чайка',
    tiger: 'Тигр',
    elephant: 'Слон',
};

export default class extends Component {
    state = {
        readOnly: false,
        disabled: false,
        failure: false,
        selected: [ 'wolf' ],
        props: '{}',
        title: 'Название',
        placeholder: 'Input an enemy',
    };
    handleChange = selected => this.setState({ selected });
    render() {
        return (
            <div className="example__dropdown-tagging">
                <DropDownTagging
                    list={list}
                    selected={this.state.selected}
                    ref={(r) => { this.$input = r; }}
                    placeholder={this.state.placeholder}
                    onChange={this.handleChange}
                    readOnly={this.state.readOnly}
                    disabled={this.state.disabled}
                    style={{ width: '300px', float: 'left' }}
                    {...parse(this.state.props)}
                />
                <div style={{ padding: '10px 0', clear: 'both' }}>
                    <button onClick={() => this.setState({ selected: [ 'torture', 'tiger' ].sort() })}>select 'torture' and 'tiger'</button>
                    <button onClick={() => this.setState({ readOnly: !this.state.readOnly })}>readOnly: {+this.state.readOnly}</button>
                    <button onClick={() => this.setState({ disabled: !this.state.disabled })}>disabled: {+this.state.disabled}</button>
                    <button onClick={() => this.setState({ failure: !this.state.failure })}>failure: {+this.state.failure}</button>
                    <p>selected = {JSON.stringify(this.state.selected)}</p>
                </div>
            </div>
        );
    }
}
