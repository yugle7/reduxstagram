﻿Компонент выбора и создания тегов.
Вписывая новый тег, появляется попап с предложением выбрать из уже существующих тегов.
Можно выбрать из них, а можно создать свой новый тег, если его имя не совпадает с тегами из базы.
Для этого нужно нажать Enter в поле ввода.


### usage 
see ./example.js

```js
<DropDown.Tagging
    list={{
        rabbit: 'Кролик',
        wolf: 'Волк',
        torture: 'Черепаха',
        monkey: 'Обезьяна',
        seagull: 'Чайка',
        tiger: 'Тигр',
        elephant: 'Слон'
    }}
    selected={[ 'wolf' ]}
    ref={r => {this.$input = r;}}
    placeholder="Выберите животное"
    onChange={(...args) => console.log(...args)}
    style={{ width: '300px', float: 'left' }}
/>
```

### props
* className - класс корневого узла компонента
* list { key: value, ... } - список всех тегов
* selected [ key, ... ] - ключи выбранных тегов, заданные извне
* placeholder - плейсхолдер инпута
* readOnly - прячем инпут и показываем только выбранные теги
* disabled - запрещаем изменять
* appended - позволяем добавлять свои варианты
* failure - добавляется класс failure, который делает инпут красным
* onChange (selected, { key: value }) - реакция на изменение набора тегов, передает массив выбранных тегов и ключ:значение изменного тега
* onEnter - реакция на энтер


### methods
* get/set value - можно получить или задать выбранные теги
* filter ({ search, list }) - фильтрация списка тегов, сначала убираем уже выбранные, а затем сравниваем с поисковой строкой
* handleChange ({ search, list }) - вызывается при изменении инпута
* handleItemClick ({ key }, open ) - вызывается при выборе тега из списка
* toggleSelected (key) - возвращает новый набор выбранных тегов, в который либо добавляем key, если его не было, либо наоборот
* handleKeyDown - позволяет добавить реакцию на клавиши
    ArrowUp, ArrowDown - по клавишам вверх/вниз ходим по списку тегов
    Tab - сворачиваем окно подсказок, если теряем фокус по табу
    Enter - либо создаем новый тег, либо выбираем из списка подсказок
    Escape - закрываем попап подсказок
* handleEnter - при энтере, когда мы находимся в инпуте. Если у нас уже есть тег с таким значением, то выбираем его, иначе создаем новый 


### state
* open - флаг, можно ли показывать попап
* selected [] - текущее состояние выбранных ключей
* filtered [] - массив подсказок (создается из списка тегов)
* appended {} -  список введенных пользователем тегов
* search - поисковая строка
* position - номер подсвеченной строки в списке подсказок


### troubleshooting
* нельзя искать с символом "\"
    - new RegExp(search, 'i') создает регулярку, но в search нельзя передать слово с обратным слешем, поскольку это вызовет ошибку
* пространство имен может пересечься, если мы в качестве тега зададим ключ от уже существующего. Поэтому нужно либо делать так, чтобы ключ равнялся значению, либо переписать логику самого дропдауна!