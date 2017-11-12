import React from 'react';
import PropTypes from 'prop-types';
import { BaseComponent } from '_base';
import { T } from './_blocks';
import { CheckBox } from '_blocks';
import isEqual from 'lodash.isequal';
import { saveTableFilters } from 'stores/utils';
import './styles.scss';

/**
 * поддерживает мод, когда id выступают в качестве чекбоксов,
 * чтобы можно было выполнять со строками различные манипуляции
 *
 * Usage: (see subject/index.js)
 *
 * HEADER
 * - children (как отображается в загаловке, может быть html-тэгом)
 * - cell (вид представления данных label, count, date, ... , но может быть кастомным)
 * - sorted (сортировка)
 * - search (поиск)
 * headered - (изобретенный термин) обозначает настройки показа заголовков - какие включены, какие выключены, плюс их названия
 *
 * RIBBON
 * если есть ribbon, то рисуем чекбоксы для выбора
 * в ribbon есть опция single - если хотим показывать только при единичном выборе, например, для редактирования
 * isPermissions('something.update') - если хотим показывать функционал лишь при определенных правах, все false элементы в ribbon не учитываются
 *
 * 1. side - на какой стороне происходит сортировка и поиск
 *   есть своя реализация через фронтенд (sort="frontend")
 *
 * 2. onItemClick - действие при клике на элемент списка
 *
 * 3. getList - нужен для получения нового списка при выборе стороны бекенда (side="backend")
 *
 * 4. list - собственно, сам список, который мы отображаем
 *
 * 5. Неявные возможности
 * - если убрать ribbon - то не рисуются чекбоксы (по другому их убрать нельзя)
 * - по умолчанию сортировка и поиск происходит на бекенде (см. дефолтные настройки)
 *
 *
 <Table
    ref="table"
    side="frontend"
    header={{ a: { children: 'Название', cell: 'label', sorted: true, search: true } }}
    onItemClick={() => console.log('on item click')}
    getList={({ q, sort }) => console.log(`get new list with sorting ${sort} and searching ${q}`)}
    list={{ 12: {a: 'Вова'}, 234: {a: 'Петя'} }}
    ribbon={[
        // standard
        'cancel', // { icon: 'cancelSVG', action: this.handleCancelRibbon },
        'select', // { icon: 'selectSVG', action: this.handleSelect },
        // custom
        { icon: 'cancelSVG', action: this.refs.table.handleSelectAll.bind(this, false)  },
        { icon: 'selectSVG', action: this.refs.table.handleSelectAll.bind(this, true)  },
        { icon: 'pencilSVG', action: this.handleOpenModalUpdate, single: true }, // update only if single selection
        { icon: 'deleteSVG', action: () => this.refs.table.getSelected('visible').forEach(this.props.deleteUser) }, // delete
        { icon: 'executeEmailSVG', action: handleExecute('email')} // execute
    ]}
    headered={{ count: 2, prefer: [...] }} // либо явно указать, какие включить
    headered={{ checked: { person_name: true, person_email: false, ... } }}
 />

 */

export default class Table extends BaseComponent {
    static defaultProps = {
        side: 'backend',
        header: {},
        list: [],
        query: {},
    };

    static propTypes = {
        query: PropTypes.object,
        className: PropTypes.string,
        header: PropTypes.shape({
            name: PropTypes.shape({
                name: PropTypes.string,
                len: PropTypes.number,
                type: PropTypes.string,
            }),
        }),
        onItemClick: PropTypes.func,

        // У элементов списка обязательно должно быть уникальное поле "id"
        list: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            // some data here
        })),

        // Имя уникального хранилища под фильтры и сортировку данной таблицы
        tableName: PropTypes.string,
    };

    static contextTypes = {
        store: PropTypes.object,
    };

    static Tabs = T.Tabs;

    constructor(props) {
        super(props);

        this.state = {
            header: {},
            headered: {},
            list: [],
            selected: [],
            q: {},
            sort: [],
            query: {},
            processing: false,
        };
    }

    componentWillMount() {
        this.updateState({ selected: [], headered: this.props.headered });
    }
    componentWillReceiveProps(nextProps) {
        const {
            list, header, headered, query,
        } = nextProps;
        if (!isEqual(list, this.props.list)) this.updateState({ list, header, headered });
        if (!isEqual(query, this.props.query)) this.reloadBackend(query);
    }

    render() {
        const {
            className, onItemClick, loading, tableName,
        } = this.props;
        let { ribbon = [] } = this.props;
        const { list, header, headered } = this.state;

        if (ribbon) {
            const defaultItems = {
                cancel: { icon: 'cancelSVG', label: 'Отмена', action: this.handleSelectAll.bind(this, false) },
                select: { icon: 'selectAllSVG', label: 'Выбрать всё', action: this.handleSelectAll.bind(this, true) },
            };
            ribbon = ribbon.map(item => ~Object.keys(defaultItems).indexOf(item) && defaultItems[item] || item) || Object.values(defaultItems);
        }

        return (
            <div className={[ className, 'pcs-table', loading && 'hidden' ]}>
                <div className="table">
                    <T.Header ref="header" tableName={tableName} header={header} onSort={this.handleSort} onSearch={this.handleSearch} />
                    {
                        list.map((item, index) => (
                            <T.Item
                                header={header}
                                item={item}
                                selected={item.id && ~this.state.selected.indexOf(item.id.name)}
                                key={index}
                                onClick={onItemClick}
                                tableProps={this.props}
                            />
                        ))
                    }
                </div>
                <T.Loading loading={loading} />
                <T.Headered checked={headered.checked} labels={headered.labels} onChange={checked => this.updateState({ headered: { checked } })} />
                <T.Ribbon list={list} ribbon={ribbon} />
            </div>
        );
    }
    // может быть два варианта: эвристический и явный
    // 1. headered = { count: 2, prefer: [...] } - перемещаем все предпочитаемые заголовки вперед, а затем берем первые count заголовков
    // 2. headered = { checked: { person_name: true, person_email: false, ... } }
    getHeadered = (header, settings) => {
        if (!settings || !Object.keys(header).length) return {};
        let checked;
        if (settings.prefer) {
            checked = Object.keys(header);
            settings.prefer.forEach((i) => {
                const index = checked.indexOf(i);
                if (~index) checked = [ i, ...header.slice(0, index), ...header.slice(index + 1) ];
            });
            const count = Math.min(settings.count, checked.length);
            checked = checked.reduce((res, i, index) => ({ ...res, [i]: index < count }), {});
        } else if (settings.checked) checked = settings.checked;

        const labels = Object.keys(header).reduce((res, i) => ({ ...res, [i]: header[i].children }), {});

        return { checked, labels };
    };
    updateState = ({
        selected = this.state.selected, list = this.props.list, header = this.props.header, headered = this.state.headered,
    }) => {
        headered = this.getHeadered(header, headered);
        if (headered.checked) header = Object.keys(headered.checked).filter(i => headered.checked[i]).reduce((res, i) => ({ ...res, [i]: header[i] }), {});
        // если у нас есть чекбоксы, значит есть и панелька
        if (this.props.ribbon) {
            // подгоняем к виду { name: 123, checked: bool<есть ли оно в selected> }
            const checkedId = id => id && ((typeof id === 'object') && { ...id, checked: !!~selected.indexOf(id.name) } || { name: id, checked: !!~selected.indexOf(id) });
            list = list.map(item => ({ ...item, id: checkedId(item.id) }));
            const checked = !!list.length && list.every(item => item.id.checked);
            header = {
                id: {
                    children: <CheckBox onChange={this.handleSelectAll} checked={checked} />,
                    cell: 'checkbox',
                    style: { width: '.1rem' },
                    onChange: this.handleSelect,
                },
                ...header,
            };
        }
        this.setState({
            selected, list, header, headered,
        });
    };
    handleSelect = id => (/* checked */) => {
        let { selected } = this.state;
        const index = selected.indexOf(id);
        selected = (!~index) ? [ ...selected, id ] : [ ...selected.slice(0, index), ...selected.slice(index + 1) ];
        this.updateState({ selected });
    };

    handleSelectAll = (checked) => {
        const selected = checked ? this.state.list.map(i => i.id.name) : [];
        this.updateState({ selected });
    };

    getSelected = (type) => {
        if (type === 'visible') return this.state.list.map(i => i.id.name).filter(id => ~this.state.selected.indexOf(id));
        return this.state.selected;
    };

    handleSort = field => (order) => {
        this.refs.header.handleResetSort(field); // удалить при множественной сортировке
        let { sort } = this.state;
        const i = ~sort.indexOf(field) || ~sort.indexOf(`-${field}`);
        if (i) sort = [ ...sort.slice(0, -i - 1), ...sort.slice(-i) ];
        if (order) sort = [ `${(order === 2) ? '-' : ''}${field}` ]; // , ...sort ]; - вернуться для множественной сортировки
        this.setState({ sort }, this.reloadBackend);
    };

    handleSearch = field => (query) => {
        const { q } = this.state;
        if (query) q[field] = encodeURIComponent(query);
        else delete q[field];
        this.setState({ q }, this.reloadBackend);
    };

    reloadBackend = (query = this.props.query) => {
        const { sort } = this.state;
        let { q } = this.state;
        q = { ...q, ...query };
        q = Object.keys(q).reduce((res, key) => (q[key] ? `${res},${key}:${q[key]}` : res), '').slice(1);
        this.event('getList', { q, sort });
    };

    // reloadFrontend = () => {
    //     const { sort } = this.state;
    //     const { query } = this.props;
    //     const q = { ...this.state.q, ...query };
    //
    //     let list = [ ...this.props.list ];
    //     Object.keys(q).forEach(field => {
    //         if (list.length) list = list.filter(this.search(field, decodeURIComponent(q[field])));
    //     });
    //     if (list.length && sort.length) sort.slice(0, 1).forEach(field => list.sort(this.compare(field)));
    //     this.updateState({ list });
    // };
    //
    // reloadList = () => {
    //     switch (this.props.side) {
    //         case 'backend': return this.reloadBackend.bind(this)();
    //         case 'frontend': return this.reloadFrontend.bind(this)();
    //         default: return null;
    //     }
    // };
    //
    // search = (field, value) => {
    //     const { search } = this.props.header[field];
    //     if (typeof search === 'function') return search(field, value);
    //     return i => ~i[field].toLowerCase().indexOf(value.toLowerCase());
    // };
    //
    // compare = (field, type) => {
    //     // определяем, в каком порядке хотим сортировать
    //     let v = 1;
    //     if (field[0] === '-') {
    //         field = field.slice(1);
    //         v = -1;
    //     }
    //     // если не задали тип явно или через header, то пробуем определить его самостоятельно
    //     type = type || this.props.header[field].sort || typeof this.state.list[0][field];
    //
    //     if (type === 'string') {
    //         return (a, b) => {
    //             const A = a[field].toLowerCase();
    //             const B = b[field].toLowerCase();
    //             return (2 * (A > B) - 1) * v;
    //         };
    //     }
    //     if (type === 'number') {
    //         return (a, b) => {
    //             const A = a[field];
    //             const B = b[field];
    //             return (A - B) * v;
    //         };
    //     }
    //     if (typeof type === 'function') {
    //         return (a, b) => type(a, b) * v;
    //     }
    //     console.log(`%c--> не была найдена функция сортировки у поля ${field} - ${type}`, 'color: chocolate');
    //     return null;
    // };
}
