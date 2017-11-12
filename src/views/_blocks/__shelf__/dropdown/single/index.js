import React from 'react';
import PropTypes from 'prop-types';
import { BaseComponent, Icon } from '_base';
import { findDOMNode } from 'react-dom';
import { closeSVG } from 'assets/icons';
import isEqual from 'lodash.isequal';
import './styles.scss';


export default class DropDownSingle extends BaseComponent {
    static propTypes = {
        className: PropTypes.string,
        type: PropTypes.string,
        list: PropTypes.shape({
            children: PropTypes.any,
            value: PropTypes.string,
        }),
        selected: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        searching: PropTypes.bool,
        cleaning: PropTypes.bool,
        onChange: PropTypes.func,
        isValid: PropTypes.bool,
    };

    static defaultProps = {
        list: {},
        actions: {},
        cleaning: false,
        type: 'text',
    };

    state = {
        open: false,
        selected: undefined,
        list: [],
        actions: Object.keys(this.props.actions).map(key => ({ ...this.props.actions[key], key })),
        search: '',
        position: null,
    };

    componentWillMount() {
        this.$items = [];
    }

    componentWillReceiveProps(nextProps) {
        const { selected, list } = nextProps;
        if (selected !== this.props.selected || !isEqual(list, this.props.list)) this.value = { selected, list };
    }

    componentDidMount() {
        this.value = { selected: this.props.selected };
        document.addEventListener('click', this.handleDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
    }

    handleDocumentClick = (e) => {
        const closest = (el, fn) => el && (fn(el) ? el : closest(el.parentNode, fn));
        const $parent = findDOMNode(this);
        const open = closest(e.target, el => el === $parent);
        return !open && this.setState({ open }, () => { this.value = { selected: this.state.selected }; });
    };

    set value(value) { // { selected, list, search, open, ... }
        if (typeof value === 'string' || typeof value === 'number') value = { selected: value }; // supporting case this.value = key
        if (typeof value !== 'object' || value === null) return console.warn('DropDown: set wrong value', value);

        const list = this.getList(value.list);
        const re = new RegExp(value.search, 'i');
        const filtered = Object.values(list).filter(item => re.test(item.value));
        const text = value.selected && list[value.selected] && list[value.selected].value || '';
        this.setState({ ...value, list: filtered });
        if (this.$input) this.$input.value = text;
        return null;
    }

    get value() {
        return this.state.selected;
    }

    getList = (list = this.props.list) => Object.keys(list).reduce((res, key) => {
        let item = list[key];
        if (typeof item === 'string') item = { children: item, value: item };
        else if (typeof item !== 'object' || item === null || typeof item.value !== 'string') {
            console.warn('DropDown: List is incorrect! His items should be a string or have a field \'value\'', item, list);
            item = { children: item, value: '' };
        }
        return { ...res, [key]: { ...item, key } };
    }, {});

    handleChange = ({ search = '', list = this.props.list, open = false } = {}) => {
        const re = new RegExp(search, 'i');
        const filtered = Object.values(this.getList(list)).filter(item => re.test(item.value));
        this.setState({ search, list: filtered, open });
    };

    handleItemClick = ({ key, action, readOnly } = {}, position, open = false) => () => {
        if (typeof key === 'undefined' || readOnly) return null;
        if (action) return action();
        this.value = { selected: key, open, position };
        return this.event('onChange', key, this.props.list[key]);
    };

    handleKeyDown = (e) => {
        const { actions, list, selected } = this.state;
        let { position } = this.state;
        const len = actions.length + list.length;
        this.$input.focus();
        if (position === null && typeof selected !== undefined) {
            position = list.findIndex(item => item.key === selected);
        }

        const scroll = (pos) => {
            const parent = this.$list.getBoundingClientRect();
            const element = this.$items[pos].getBoundingClientRect();
            if (parent.bottom < element.bottom) return this.$list.scrollBy(0, element.bottom - parent.bottom);
            if (parent.top > element.top) return this.$list.scrollBy(0, element.top - parent.top);
        };
        switch (e.key) {
            case 'ArrowUp': position = (position === null) ? len - 1 : (position + len - 1) % len; scroll(position); e.preventDefault(); break;
            case 'ArrowDown': position = (position === null) ? 0 : (position + 1) % len; scroll(position); e.preventDefault(); break;
            case 'Tab': return this.handleToggle(false);
            case 'Enter': if (position !== null) this.handleItemClick([ ...actions, ...list ][position], true)(); break;
            case 'Escape': this.handleToggle(false); this.value = { selected: this.state.selected }; return this.$input.blur();
            default: return null;
        }
        return this.setState({ position });
    };
    handleToggle = (open = !this.state.open) => {
        if (this.props.disabled) return;
        this.setState({ open });
        if (open) this.event('onOpen');
    };
    render() {
        const {
            className, type, disabled, searching, cleaning, placeholder, isValid, failure, ...props
        } = this.props;
        const {
            open, list, actions, selected, position,
        } = this.state;
        delete props.value;
        delete props.list;
        delete props.onChange;
        delete props.onOpen;
        delete props.actions;

        const val = this.$input && this.$input.value;
        const dubPlaceholder = val && placeholder;
        const shift = actions.length || 0;

        return (
            <div
                {...props}
                className={[ className, 'dropdown-single', disabled && 'disabled', open && 'open', failure && 'failure' ]}
                onKeyDown={this.handleKeyDown}
            >
                <div className={[ 'dropdown-single__input', 'input', dubPlaceholder && 'duplicate-placeholder', isValid === false && 'failure' ]}>
                    <input
                        ref={(r) => { this.$input = r; }}
                        type={type}
                        className="input__search"
                        onFocus={() => this.handleToggle(true)}
                        onChange={e => this.handleChange({ search: e.target.value, open: true })}
                        disabled={disabled}
                        readOnly={!searching}
                        placeholder={placeholder}
                    />
                    <div className={[ 'input__placeholder', !dubPlaceholder && 'hidden' ]}>{placeholder}</div>
                    <span
                        className={[ 'input__caret', `input__caret--${open ? 'bottom' : 'left'}` ]}
                        onClick={() => this.handleToggle()}
                    />
                    <span
                        className={[ 'input__cleaner', (!val || !cleaning || disabled) && 'hidden' ]}
                        onClick={this.handleItemClick({ key: null })}
                    >
                        <Icon glyph={closeSVG} className="icon" />
                    </span>
                </div>

                <ul className="dropdown-single__list" ref={(r) => { this.$list = r; }}>
                    {
                        actions.map((i, index) => (
                            <li
                                ref={(r) => { this.$items[index] = r; }}
                                key={i.key}
                                className={[ 'dropdown-single__item', 'action', i.readOnly && 'disabled', position === index && 'position' ]}
                                onClick={this.handleItemClick(i, index)}
                                onMouseOver={() => this.state.position === null && this.setState({ position: index })}
                                children={i.value}
                            />))
                    }
                    {
                        list.map((i, index) => (
                            <li
                                key={i.key}
                                ref={(r) => { this.$items[index + shift] = r; }}
                                className={[ 'dropdown-single__item', i.readOnly && 'disabled', position === (index + shift) && 'position', i.key === selected && 'selected' ]}
                                onClick={this.handleItemClick(i, index + shift)}
                                children={i.children}
                                onMouseOver={() => this.state.position === null && this.setState({ position: (index + shift) })}
                            />
                        ))
                    }
                    <li className={[ 'dropdown-single__item', 'disabled', list.length && 'hidden' ]}>
                        <div>Нет совпадений</div>
                    </li>
                </ul>
            </div>
        );
    }
}
