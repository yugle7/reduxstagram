import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { Icon } from '_base';
import { closeSVG } from 'assets/icons';
import isEqual from 'lodash.isequal';
import './styles.scss';


export default class Tagging extends Component {
    static propTypes = {
        className: PropTypes.string,
        list: PropTypes.object.isRequired,
        selected: PropTypes.array,
        placeholder: PropTypes.string,
        maxLength: PropTypes.number,
        readOnly: PropTypes.bool,
        disabled: PropTypes.bool,
        appended: PropTypes.bool,
        failure: PropTypes.bool,
        onChange: PropTypes.func,
        onEnter: PropTypes.func,
    };

    static defaultProps = {
        selected: [],
        appended: false,
        maxLength: 255,
    };

    state = {
        open: false,
        selected: this.props.selected,
        filtered: [],
        appended: {},
        search: '',
        position: null,
    };

    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick);
    }
    componentWillReceiveProps(nextProps) {
        const { selected, list } = nextProps;
        this.setState({ search: '' }); // нужно для того, чтобы очищался инпут по кнопке 'Сбростиь фильтры'
        if (!isEqual(selected.sort(), this.props.selected.sort())) this.setState({ selected: selected.sort() });
        if (!isEqual(list, this.props.list)) this.setState({ filtered: this.filter({ list }) });
    }
    componentWillUnmount() { document.removeEventListener('click', this.handleDocumentClick); }
    handleDocumentClick = (e) => {
        const closest = (el, fn) => el && (fn(el) ? el : closest(el.parentNode, fn));
        const $parent = findDOMNode(this);
        const hitting = closest(e.target, el => el === $parent);
        if (!hitting) this.setState({ open: false });
        else this.$input.focus();
    };
    get value() {
        return [ ...this.state.selected ];
    }
    set value(selected) {
        this.setState({ selected, search: '' });
    }
    filter = ({ search = this.state.search, list = this.props.list }) => {
        const enrichedList = { ...list, ...this.state.appended };
        return Object.keys(enrichedList)
            .filter(key => !this.state.selected.includes(key))
            .filter(key => new RegExp(search, 'i').test(enrichedList[key]))
            .map(key => ({ key, value: enrichedList[key] }));
    };

    handleChange = ({ search = '', list } = {}) => {
        this.setState({
            open: true, search, filtered: this.filter({ search, list }), position: null,
        });
    };

    handleItemClick = ({ key }, open = true) => () => {
        if (this.props.readOnly || this.props.disabled) return null;
        const selected = this.toggleSelected(key);
        let { filtered } = this.state;
        const list = { ...this.props.list, ...this.state.appended };
        const index = filtered.findIndex(i => i.key === key);
        filtered = (index === -1) ? [ ...filtered, { key, value: list[key] } ] : [ ...filtered.slice(0, index), ...filtered.slice(index + 1) ];
        this.setState({
            selected, filtered, open, search: '',
        });

        return this.event('onChange', selected, { [key]: list[key] });
    };
    toggleSelected = (key) => {
        const { selected } = this.state;
        const index = selected.indexOf(key);
        return (index === -1) && [ ...selected, key ].sort() || [ ...selected.slice(0, index), ...selected.slice(index + 1) ];
    };
    handleKeyDown = (e) => {
        const { filtered, search, open } = this.state;
        let { position } = this.state;
        const len = filtered.length;
        const isOpen = open && search && filtered.length;
        switch (e.key) {
            case 'ArrowUp': position = (position === null) ? len - 1 : (position + len - 1) % len; break;
            case 'ArrowDown': position = (position === null) ? 0 : (position + 1) % len; break;
            case 'Tab': return this.setState({ open: false });
            case 'Enter':
                if (!isOpen || position === null) return this.handleEnter(e);
                return this.handleItemClick(filtered[position])();
            case 'Escape': return this.setState({ open: false }, () => { this.handleChange(); this.$input.blur(); });
            default: return null;
        }
        e.preventDefault();
        return isOpen && this.setState({ position });
    };
    handleEnter = () => {
        const value = this.$input.value;
        if (!value) return console.log('%cTAG is empty', 'color: chocolate', value);
        // Проверяем, есть ли у нас уже такой тег
        const list = { ...this.props.list, ...this.state.appended };
        const key = Object.keys(list).find(i => list[i] === value);
        if (key) {
            const { selected } = this.state;
            const index = selected.indexOf(key);
            return (index === -1) && this.handleItemClick({ key })();
        }
        if (!this.props.appended) return false;
        // Создаем в appended новый элемент { [value]: value }
        const { appended } = this.state;
        let { selected } = this.state;
        const index = selected.indexOf(value);
        if (index === -1) selected = [ ...selected, value ].sort();
        const novice = { [value]: value }; // { [`@@novice#${value}`]: value };
        this.setState({ selected, appended: { ...appended, ...novice }, search: '' }, () => {
            this.event('onChange', this.state.selected, novice);
        });
    };
    render() {
        const { className, readOnly, disabled, failure, placeholder, maxLength, ...props } = this.props;
        const { open, search, selected, position, filtered } = this.state;
        delete props.list;
        delete props.onChange;
        delete props.appended;
        const isOpen = open && search && filtered.length;
        const isCleaner = search && !disabled && !readOnly;
        const list = { ...this.props.list, ...this.state.appended };
        return (
            <div
                {...props}
                className={[ className, 'tagging', isOpen && 'open', disabled && 'disabled', failure && 'failure' ]}
                onKeyDown={this.handleKeyDown}
            >
                <div className="tagging__input">
                    <input
                        ref={(r) => { this.$input = r; }}
                        type="text"
                        className={[ readOnly && 'hidden' ]}
                        value={search}
                        onChange={e => this.handleChange({ search: e.target.value })}
                        disabled={disabled}
                        placeholder={placeholder}
                        maxLength={maxLength}
                    />
                    <Icon glyph={closeSVG} className={[ 'icon tagging__cleaner', !isCleaner && 'hidden' ]} onClick={() => this.handleChange()} />
                    <ul className={[ 'tagging__list', !isOpen && 'hidden' ]}>
                        {
                            filtered.map((i, index) => (
                                <li
                                    key={i.key}
                                    className={[ 'tagging__item', position === index && 'position' ]}
                                    onClick={this.handleItemClick(i)}
                                    onMouseOver={() => this.setState({ position: index })}
                                    onMouseOut={() => this.setState({ position: null })}
                                    children={i.value}
                                />))
                        }
                    </ul>
                </div>
                <ul className={[ 'selected__list', !selected.length && 'hidden' ]}>
                    {
                        selected.map(key => (
                            <li key={key} className="selected__item">
                                {list[key]}
                                <Icon glyph={closeSVG} className="icon selected__cleaner" onClick={this.handleItemClick({ key }, false)} />
                            </li>))
                    }
                </ul>
            </div>
        );
    }
}
