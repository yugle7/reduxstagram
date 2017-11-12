import React from 'react';
import PropTypes from 'prop-types';
import { BaseComponent } from '_base';

import './styles.scss';

/**
 * Usage:
 * Необходимо задать названия чекбоксов, а так же их значения с ключами
 * Каждое изменение вызывает событие onChange, в котором передается
 * измененный список { inputKey: isChecked }
 * - label - название чекбокса, которое видно пользователю
 * - checked - начальное состояние, здесь это либо true либо false, относительно которого смотрится, было ли изменение
 * - readonly - возможность сделать все неактивным
 * - onChange - когда мы кликаем по чекбоксу, то нам возвращается true или false, выбран элемент или нет
 *
 * <CheckBox
 *      label="Кролик"
 *      checked={this.state.suOrigin['rabbit']} // начальное состояние
 *      onChange={ value => this.suUpdateStore('rabbit', value, callback) }
 * />
 */
export default class CheckBox extends BaseComponent {
    static defaultProps = {
        checked: false,
        readonly: false,
    };
    static propTypes = {
        className: PropTypes.string,
        label: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]),
        checked: PropTypes.bool,
        readonly: PropTypes.bool,
        onChange: PropTypes.func,
    };
    constructor(props) {
        super(props);

        this.state = {};
    }
    componentWillMount() {
        const { checked } = this.props;
        this.suInitStore({ checked });
    }
    componentWillReceiveProps(nextProps) {
        const { checked } = nextProps;
        if (checked !== this.props.checked) this.suInitStore({ checked });
    }

    handleChange = ({ checked = !this.state.checked }) => {
        if (this.props.readonly) return;
        this.suUpdateStore('checked', checked, () => this.event('onChange', checked));
    };
    setValue = checked => this.suUpdateStore('checked', checked, () => this.event('onChange', checked));
    set value(checked) { this.suUpdateStore('checked', checked, () => this.event('onChange', checked)); }
    get value() { return this.state.checked; }

    render() {
        const { className, label, readonly } = this.props;
        const { checked } = this.state;
        return (
            <fieldset
                className={[ 'checkbox', className, readonly && 'radio__readonly' ]}
                onClick={this.handleChange}
            >
                <span className={[ 'checkbox__square', checked && 'checked', label && 'has-label' ]}>
                    <span className="sa-line sa-tip" />
                    <span className="sa-line sa-long" />
                </span>
                { label && <span className="checkbox__label">{label}</span> }
            </fieldset>
        );
    }
}
