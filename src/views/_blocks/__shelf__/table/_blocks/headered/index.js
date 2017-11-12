import React from 'react';
import PropTypes from 'prop-types';
import { BaseComponent } from '_base';
import { CheckBoxes } from '_blocks';
import { findDOMNode } from 'react-dom';
import isEqual from 'lodash.isequal';
import './styles.scss';

class Headered extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
        this.bindMethods(`
            handleToggle,
            handleDocumentClick,
        `);
        this.handleChange = name => value => this.suUpdateStore(name, value, this.event('onChange', value));
    }

    componentWillMount() {
        const { checked } = this.props;
        this.suInitStore({ checked });
    }
    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
    }
    componentWillReceiveProps(nextProps) {
        const { checked } = nextProps;
        if (!isEqual(checked, this.props.checked)) this.suInitStore({ checked });
    }
    render() {
        const { labels } = this.props;
        const { checked } = this.state;
        if (!checked) return <div className="hidden" />;
        return (
            <div className="pcs-table__row">
                <div className="pcs-table__row-trigger" onClick={this.handleToggle}>&#x25cf;</div>
                <div ref="container" className={[ 'pcs-table__row-list', !this.state.open && 'hidden' ]}>
                    <div className="pcs-table__row-title">Отображать поля:</div>
                    <CheckBoxes
                        labels={labels}
                        list={checked}
                        onChange={this.handleChange('checked')}
                    />
                </div>

            </div>
        );
    }

    handleToggle({ open = this.state.open }) {
        this.setState({ open: !open });
    }
    handleDocumentClick(e) {
        const closest = (el, fn) => el && (fn(el) ? el : closest(el.parentNode, fn));
        const $parent = findDOMNode(this);
        const open = closest(e.target, el => el === $parent);
        return !open && this.setState({ open });
    }
}

Headered.defaultProps = {
    // checked: undefined, - по умолчанию не рисуется
    labels: {},
};

Headered.propTypes = {
    checked: PropTypes.object,
    labels: PropTypes.object,
};

export default Headered;
