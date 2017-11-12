import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { BaseComponent } from '_base';
import isEqual from 'lodash.isequal';
import { CheckBox } from '_blocks';
import { wordOfNum } from 'helpers';
import './styles.scss';


export default class DropDownMulti extends BaseComponent {
    static propTypes = {
        className: PropTypes.string,
        actions: PropTypes.object, // список действий
        list: PropTypes.object, // список значений, которые можно выбрать
        selected: PropTypes.array, // номера выбранных значений
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        words: PropTypes.arrayOf(PropTypes.string), // слова для составления информации для чисел (1, 2, 5)
        defaultValue: PropTypes.string, // отображается, когда у нас ничего не выбрано
    };

    static defaultProps = {
        list: {},
        actions: {},
        selected: [],
        words: [ 'нечто', 'нечта', 'нечт' ],
        defaultValue: 'Ничего не выбрано',
    };

    state = {
        open: false,
        selected: this.props.selected,
        list: [],
        actions: [],
        search: '',
        position: null,
    };

    componentWillMount() {
        this.words = wordOfNum(this.props.words);
        this.setState({
            list: this.getList(this.props.list),
            actions: this.getActions(this.props.actions),
        });
    }

    componentWillReceiveProps(nextProps) {
        const { selected, list } = nextProps;
        if (!isEqual(selected, this.props.selected)) this.setState({ selected: selected.sort() });
        if (!isEqual(list, this.props.list)) this.setState({ list: this.getList(this.props.list) });
    }
    componentDidMount() { document.addEventListener('click', this.handleDocumentClick); }
    componentWillUnmount() { document.removeEventListener('click', this.handleDocumentClick); }
    /*
     Вызывается, когда пользователь кликает в любое место рабочей области
     Если он нажал не на dropdown и не на popup dropdown'a, то popup необходимо закрыть и обновить инпут
     */
    handleDocumentClick = (e) => {
        const closest = (el, fn) => el && (fn(el) ? el : closest(el.parentNode, fn));
        const $parent = findDOMNode(this);
        const open = closest(e.target, el => el === $parent);
        return !open && this.setState({ open }, () => {
            this.updateInfo(undefined, () => {
                this.$input.value = this.state.info;
                this.handleChange();
            });
        });
    };

    set value(selected) { this.updateInfo(selected.sort(), () => { this.$input.value = this.state.info; }); }
    get value() { return this.state.selected; }

    // преобразование экшенов к массиву
    getActions = (actions = this.props.actions) => Object.keys(actions)
        .map(key => ({
            key, value: actions[key].value, action: actions[key].action, readOnly: actions[key].readOnly,
        }));

    // преобразование списка к массиву и фильтрация по введенному значению search
    getList = (list = this.props.list, search = '') => Object.keys(list)
        .filter(key => new RegExp(search, 'i').test(list[key]))
        .map(key => ({ key, value: list[key], readOnly: list[key].readOnly }));

    // информация о том, сколько выбрано item'ов
    updateInfo = (selected = this.state.selected, ...args) => {
        const count = selected.length;
        let info;
        if (!count) info = this.props.defaultValue;
        else if (count > 1) info = `${count} ${this.words(count)}`;
        else info = this.props.list[selected[0]];
        this.setState({ selected, info }, ...args);
    };

    handleChange = (search = '', list = this.props.list) => this.setState({ list: this.getList(list, search), search });

    handleFocus = () => this.setState({ open: true }, () => { this.$input.value = ''; this.handleChange(); });

    handleItemClick = ({ key, action, readOnly }, open = true) => () => {
        if (action) return action();
        if (!key || readOnly) return null;
        const selected = this.toggleSelected(key);
        this.updateInfo(selected, () => this.setState({ open }));

        return this.event('onChange', selected, { [key]: this.props.list[key] });
    };

    toggleSelected = (key) => {
        const { selected } = this.state;
        const index = selected.indexOf(key);
        // пока нам скорость вставки не так критична, но без сортировки сделать ее быстрее
        // бинарный поиск и вставка за найденным элементом
        return (index === -1) && [ ...selected, key ].sort() || [ ...selected.slice(0, index), ...selected.slice(index + 1) ];
    };


    handleKeyDown = (e) => {
        const { list } = this.state;
        const len = list.length;
        let { position } = this.state;
        switch (e.key) {
            case 'ArrowUp': position = (position === null) ? len - 1 : (position + len - 1) % len; break;
            case 'ArrowDown': position = (position === null) ? 0 : (position + 1) % len; break;
            case 'Tab': return this.setState({ open: false });
            case 'Enter': if (position !== null) this.handleItemClick(list[position])(); break;
            case 'Escape': return this.setState({ open: false }, () => { this.handleChange(); this.$input.blur(); });
            default: return null;
        }
        e.preventDefault();
        this.setState({ position });
    };

    render() {
        const {
            className, disabled, placeholder, ...props
        } = this.props;
        const {
            open, list, actions, selected, position,
        } = this.state;
        delete props.list;
        delete props.actions;
        delete props.defaultValue;
        delete props.words;
        return (
            <div
                {...props}
                className={[ className, 'dropdown-multi', open && 'open' ]}
                onKeyDown={this.handleKeyDown}
            >
                <input
                    ref={(r) => { this.$input = r; }}
                    type="text"
                    className="dropdown-multi__input"
                    onChange={e => this.handleChange(e.target.value)}
                    disabled={disabled}
                    placeholder={placeholder}
                    onFocus={this.handleFocus}
                />
                <span
                    className={[ 'dropdown-multi__caret', `dropdown-multi__caret--${open ? 'bottom' : 'left'}` ]}
                    onClick={() => !disabled && this.setState({ open: !open })}
                />
                <ul className="dropdown-multi__list">
                    <li className={[ 'dropdown-multi__item', 'disabled' ]}><div>{this.state.info}</div></li>
                    {
                        actions.map((i, index) => (
                            <li
                                key={i.key}
                                className={[ 'dropdown-multi__item', 'action', i.readOnly && 'disabled', position === index && 'position' ]}
                                onClick={this.handleItemClick(i)}
                                onMouseOver={() => this.setState({ position: index })}
                                onMouseOut={() => this.setState({ position: null })}
                                children={i.value}
                            />))
                    }
                    {
                        list.map((i, index) => {
                            const checked = selected && !!~selected.indexOf(i.key);
                            return (
                                <li
                                    key={i.key}
                                    className={[ 'dropdown-multi__item', i.readOnly && 'disabled', position === index && 'position', checked && 'selected' ]}
                                    onClick={this.handleItemClick(i)}
                                    onMouseOver={() => this.setState({ position: index })}
                                    onMouseOut={() => this.setState({ position: null })}
                                    children={i.readOnly ? i.value : <CheckBox label={i.value} checked={checked} />}
                                />
                            );
                        })
                    }
                    <li className={[ 'dropdown-multi__item', 'disabled', list.length && 'hidden' ]}>
                        <div>Нет совпадений</div>
                    </li>
                </ul>
            </div>
        );
    }
}
