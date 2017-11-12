import React from 'react';
import PropTypes from 'prop-types';
import { BaseComponent/* , Icon */ } from '_base';
import { countText, numberWithComma } from 'helpers';

// import { userListSVG } from 'assets/icons';

import './styles.scss';

class Tab extends BaseComponent {
    static propTypes = {
        className: PropTypes.string,
        count: PropTypes.number.isRequired,
    };

    render() {
        const {
            className, label, count, onClick, style,
        } = this.props;
        const styles = {
            label: {}, 'count-number': {}, 'count-string': {}, link: {}, ...this.props.styles,
        };
        return (
            <div className={[ 'pcs-table__tab', className ]} style={style} onClick={onClick}>
                <div className="pcs-table__tab__label" style={styles.label}>{label}</div>
                <span className="pcs-table__tab__count-number" style={styles['count-number']}>{numberWithComma(count)}</span>
                <span className="pcs-table__tab__count-string" style={styles['count-string']}>{countText(count)}</span>
                <div className="pcs-table__tab__link" style={{ ...styles.link, display: 'none' }}>
                    {/* <Icon glyph={userListSVG} /> */}
                    <span className="text">смотреть список</span>
                </div>
            </div>
        );
    }
}

export default class Tabs extends BaseComponent {
    static propTypes = {
        className: PropTypes.string,
        list: PropTypes.object.isRequired,
        disabled: PropTypes.bool,
    };

    constructor(props) {
        super(props);

        this.state = {
            active: !props.disabled && Object.keys(props.list)[0],
        };

        this.bindMethods('handleClick');
    }

    render() {
        const { className, list } = this.props;
        const { active } = this.state;
        return (
            <div className={[ 'pcs-table__tabs', className ]}>
                {
                    Object.keys(list).map(key =>
                        (<Tab
                            className={[ (active === key) && 'active' ]}
                            ref={key}
                            key={key}
                            label={list[key].label}
                            count={list[key].count}
                            onClick={this.handleClick(key, list[key].onClick)}
                            styles={list[key].styles}
                            style={{ cursor: list[key].onClick ? 'pointer' : 'inherit' }}
                        />))
                }
            </div>
        );
    }
    handleClick(active, callback) {
        return () => callback && this.setState({ active }, callback);
    }
}
