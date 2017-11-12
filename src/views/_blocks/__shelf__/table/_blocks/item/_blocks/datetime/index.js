import React from 'react';
import PropTypes from 'prop-types';
import { toTimeString } from 'helpers/time';
import './styles.scss';

export default class Datetime extends React.PureComponent {
	static propTypes = {
	    item: PropTypes.number,
	};

	render() {
	    const { className, item, onClick } = this.props;

	    return (
    <div className={[ className, 'table__item-datetime' ]} onClick={onClick}>
    <span>{toTimeString(item)}</span>
	        </div>
	    );
	}
}
