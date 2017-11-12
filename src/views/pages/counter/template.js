import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

export default class Counter extends Component {
    static propTypes = {
        counter: PropTypes.number.isRequired,
        onIncrement: PropTypes.func.isRequired,
        onDecrement: PropTypes.func.isRequired,
    };
    incrementIfOdd = () => this.props.counter % 2 && this.props.onIncrement();
    incrementAsync = () => setTimeout(this.props.onIncrement, 1000);
    render() {
        const { counter, onIncrement, onDecrement } = this.props;
        return (
            <div className="counter">
                Clicked: {counter} times
                <button className="counter__button" onClick={onIncrement}>+</button>
                <button className="counter__button" onClick={onDecrement}>-</button>
                <button className="counter__button" onClick={this.incrementIfOdd}>Increment if odd</button>
                <button className="counter__button" onClick={this.incrementAsync}>Increment async</button>
            </div>
        );
    }
}
