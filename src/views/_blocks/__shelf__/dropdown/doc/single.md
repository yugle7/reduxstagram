# DropDown (todo требуется доработка)

### Что это?
Компонент для выбора значения из списка

### Как это работает?
Это обычный список с возможностью выбора item'а.
Мы можем задавать произвольные стили item'ов - они могут быть как строки, так и компоненты ReactJS
Поиск ведется по полям value, которые мы заботливо передаем в DropDown.

DropDown позволяет:
1. искать по полям (для этого нам нужно передать пропс searching и иметь value каждого поля)
2. добавлять фукнциональные поля, по которым происходит действие (actions)
3. настраивать свои стили и делать DropDown неактивным

### Пример использования.
```jsx harmony
const Wrapper = props => (<span style={{ paddingLeft: '25px' }}>{props.children}</span>)
const Round = props => (
    <span
        style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: props.color,
            display: 'inline-block',
            position: 'absolute',
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)'
        }}
    />
);
const list = {
    rabbit: { value: 'Кролик', children: <Wrapper><Round color="forestgreen" />Кролик</Wrapper> },
    wolf: { value: 'Волк', children: <Wrapper><Round color="cornflowerblue" />Волк</Wrapper> },
    torture: { value: 'Черепаха', children: <Wrapper><Round color="chocolate" />Черепаха</Wrapper> },
    monkey: { value: 'Обезьяна', children: <Wrapper><Round color="red" />Обезьяна</Wrapper> },
    seagull: { value: 'Чайка', children: <Wrapper><Round color="yellow" />Чайка</Wrapper> },
    tiger: { value: 'Тигр', children: <Wrapper><Round color="yellowgreen" />Тигр</Wrapper> },
    elephant: { value: 'Слон', children: <Wrapper><Round color="magenta" />Слон</Wrapper> }
};
const actions = {
    create: { value: 'Добавить животное', action: () => console.log('%cYou created a new enemy. You are good person!', 'color: forestgreen') },
    delete: { value: 'Удалить животное', action: () => console.log('%cYou killed an enemy. You are bad person!', 'color: chocolate') }
};

<DropDown
    ref={r => {this.elements.animal = r;}}
    list={list}
    onChange={this.handleChange('animal')}
    placeholder="Выберите зверя"
    action={actions}
/>
```

### props
* ...props - есть возможность передавать пропсы для родительского дива (например, можно задавать style)
* list - список значений, из которых можно выбирать. Это объект полей вида { key: value, ...  }
* selected - ключ, который выбрали или undefined
* placeholder - строка, которая ставится, когда ничего не выбрано (или выводится сверху для Single)
* disabled - если мы не хотим, чтобы наш dropdown был активным
* readOnly - запрет изменять значения
* searching - если мы хотим, чтобы можно было искать в списке по строке
* cleaning - если мы хотим, чтобы можно было очищать выбранное значение и заодно весь ввод (пока нет у Multi)
* onChange - (key, value) => {...} - функция, которая вызывается при каждом изменении selected

### state
* open - состояние, когда у нас показывается список или нет
* selected - текущее выбранное значение
* search - строка, по которой идет поиск
* list - текущий список вида [{ key, value, searching }, ...]
* position - для перемещения по списку клавишами вверх-вниз

### methods
* set value - устанавливает новый набор выбранных значений
* get value - получаем набор выбранных значений
* handleDocumentClick - событие по клику по документу. В зависимости от того, кликнули по компоненту или вне его, делаем соответствующую работу
* handleFocus - вызывается, когда устанавливается фокус в поле ввода. По фокусу мы открываем попап и даем пользователю возможность искать значения в списке.
* handleItemClick - вызывается при клике по item'у
* handleKeyDown - реакция на клавиши (на стрелки, esc, enter)
* select - (key) => {...} добавление или удаление ключа выбранного значения в selected
* handleChange - (search, info) => {...} реакция на изменение поискового запроса
