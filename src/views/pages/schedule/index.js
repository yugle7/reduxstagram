import React from 'react';
import './styles.scss';

export default class Schedule extends React.PureComponent {
    render() {
        return (
            <div className="page-schedule">
                <ul>
                    <li>6/5 @ Evergreens</li>
                    <li>6/8 vs Kickers</li>
                    <li>6/14 @ United</li>
                </ul>
            </div>
        );
    }
}
