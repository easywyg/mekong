# Mekong

Model layer для rich-text редактора (wysiwyg). Mekong хранит документ как модель, применяет к нему команды с undo/redo и рендерит модель в DOM. Выделение и каретку держит wysiwyg-редактор поверх Mekong: в Mekong передаются только смещения `start`/`end` или позиция каретки.

Разработка шла 2016-03-30 → 2017-04-10, проект не завершён. План модернизации тулчейна и замены vdom — [TOOLCHAIN_PLAN.md](TOOLCHAIN_PLAN.md).

## Обработка ввода (принцип проекта)
Браузеру в `contenteditable` разрешена только вставка напечатанных символов. Всё остальное Mekong обрабатывает сам через команды: Enter (split / line break), Backspace и Delete (удаление текста, join), вставку из буфера, форматирование (markup), undo и redo. Благодаря этому разметка всегда получается из модели, и не нужно бороться с тем, как браузер редактирует DOM.

## Ключевые понятия
- **Document** (`src/document.js`) — тоже Entity. `state.entities` — **плоский** список всех сущностей; вложенность задаётся через `entity.parentEntity`.
- **Entity** (`src/entity.js`) — блок: Paragraph, Heading, Preformatted, List, Grid, Table. Состояние лежит в `entity.state`, значения по умолчанию — в `static defaultState`.
- **Markup** — разметка текста как массив диапазонов `[tag, start, end, attrs]`. Диапазоны могут пересекаться. `SegmentCalculator` превращает их в сегменты, а `VTreeBuilder` — во вложенное дерево (порядок вложенности задаёт массив `PRIORITY` в `segment_calculator.js`).
- **Policy** — правила сущности: `canAppend`, `canBeRemoved`, `canBeSplitted`, `canBeJoined`, `canBeMutated`, `canLineBreak`, а также `allowedTags`, `allowMutate`, `allowJoin`, `lineBreak`.
- **Command** (`src/undo_manager/command.js`) — `execute/undo/redo`, возвращают `true`, если команда применилась. Все изменения идут через `UndoManager.execute`.
- **View** — строит дерево для рендера сущности; `buildMarkup(text, markup, lineBreaks)`.

## Структура
- `src/api.js` — класс `Mekong` (`use(name)`, `create(name, state)`) и объект `core` (DI): `Entity, View, Policy, Document, Lib, Entities, Command, Mixin, VDOM`.
- `src/entities/<name>/` — фабрики `export default function(core) { return class extends … }`: entity, `view.js`, `policies/`, `commands/`, `export.js`. Классы собираются через `core.Lib.Mix(core.Entity).with(...mixins)`.
- `src/commands/document/` — create, remove, move, replace, split, join, mutate, line_break.
- `src/commands/entity/` — attr, remove_attr, markup, remove_markup, update_markup_attrs, tag, text.
- `src/mixins/` — TextMethods, MarkupMethods, AttrMethods, TagMethods (вызывают entity-команды через `runCommand`).
- `src/segments/` — `segment_calculator.js`, `new_text_segment_calculator.js`, `new_segment_calculator.js`, `vtree_builder.js`, `segment/*`.
- `src/vdom/` — форк virtual-dom (CommonJS), `VNode(entity, …)` связывает DOM-узел с сущностью. Его заменят на h() + idiomorph (см. план).
- `src/lib/` — **отсутствует в git** (`mix.js`, `entity_utils.js`), см. «Блокеры».
- `test/unit`, `test/integration` — тесты, сверяющие `innerHTML` контейнера; `test/test_helper.js` задаёт глобальные `mekong`, `content()`, `clearContentWithEntities()`.
- `stage.html` — ручная песочница.

## Команды
Тулчейн 2017 года (Babel 6, webpack 2, gulp 3, mocha 2) на современном Node не работает. Команды будут обновлены после модернизации по TOOLCHAIN_PLAN.md.

## Блокеры
- `src/lib/` никогда не коммитился: правило `lib` в `.gitignore` игнорирует и `src/lib`. Его импортируют `api.js`, `commands/entity/text.js`, `commands/document/split.js`.
- Импорты от корня `src/` (`undo_manager/command.js`, `lib/...`) резолвит только webpack, mocha их не найдёт.
- `npm test` запущен с `--watch` и не завершается.

## Баги в существующем коде
- `segments/segment_calculator.js` (блок «Split text nodes at line breaks»): `remove.add(i)` на необъявленной переменной → ReferenceError при любых `lineBreaks`. Логика разбиения неверна, исходные сегменты не удаляются. `VTreeBuilder` не обрабатывает `line_break`.
- `compactMarkup` пишет в `markup[i].start` (у массива нет `.start`), поэтому склейка соседних тегов не работает.
- Paragraph view не передаёт `state.lineBreaks` в `buildMarkup`.
- `Document.replace()` создаёт `Command.Document.Remove` вместо `Replace`.
- `Document.lineBreak()` передаёт `this` вместо `position`.
- `JoinCommand.joinMarkup` сдвигает только `end` (`m[2]`), а не `start`, и мутирует массивы markup второй сущности.
- `SplitCommand` всегда создаёт `paragraph`, независимо от типа исходной сущности.
- `TagCommand`: `!this.isTagChanged` — ссылка на метод (всегда truthy); список тегов захардкожен вместо `Policy.allowedTags`.
- `MutateCommand` переносит markup, но не `lineBreaks`; `lineBreakMutate` в политиках нигде не используется.
- `RemoveAttrCommand` проверяет truthy-значение, поэтому атрибут со значением `""`/`0` не удалится.
- `update_markup_attrs.js`: инвертированная логика (`index == -1` и чтение `markup[-1]`), в `api.js` не подключена; тест `can change its attributes` отключён (`xit`).
- `Mekong.use({Name: fn})`: `entry[key.toLowerCase()]` ищет по изменённому ключу → undefined.
- `UndoManager.redo()` не проверяет результат; `Command.redo()` ничего не возвращает.
- README использует `useEntity()`, а в API метод называется `use()`; README ссылается на несуществующий `docs/entities/table_cell.md`.

## Незавершённые фичи
- **MoveCommand** — `execute` ничего не делает, `undo` пустой; тесты move отключены (`xit`).
- **LineBreakCommand** — заглушка, `undo` пустой.
- **Document.load()/html()** пустые: нет сериализации и экспорта; `removeAll()` закомментирован.
- **Entity**: `insert/remove/move/replace/prev/next` закомментированы.
- **List**: `InsertItemCommand` вызывает несуществующий `doc.add()` и `doc.remove(id)` вместо entity, `redo` вызывает конструктор без `new`; `RemoveItemCommand` — заглушка; view не рендерит markup и передаёт attrs не как `{attributes}`; тестов нет.
- **Grid**: удаление колонки проверяет `index > 0` (первую колонку не удалить); колонки не могут содержать сущности; тестов нет.
- **Table** фактически не написана: `core.Particle` не существует, `particles/caption.js`/`column.js` пустые, `addRow/addCaption/addHeader` пустые, view вызывает `this.vnode()` без `new`, policy использует старые имена методов (`canReplace/canDelete`), нет `static type/defaultState`.
- Сущностей Image, Embed, Substrate, DefinitionList нет, хотя они описаны в `docs/entities/`.
- **Обработка ввода** (по принципу из раздела выше) пока не реализована вовсе:
  - синхронизация напечатанного текста в модель: перевести DOM-позицию в смещение сущности и вызвать `setText`. Не решено, кто это делает — Mekong (`syncFromDOM`) или wysiwyg-слой;
  - перехват `beforeinput`: Enter, Backspace, Delete, вставка, `historyUndo`/`historyRedo`, форматирование. Печать поверх непустого выделения — сначала удаление выделения командой, потом вставка символа;
  - текстовые события, которые не являются `insertText`: автокоррекция (`insertReplacementText`), «. » по двойному пробелу на iOS, диктовка, composition;
  - сдвиг диапазонов `markup` (и `lineBreaks`) при вставке и удалении текста: сейчас `setText` их не сдвигает. Нужны правила инклюзивности границ (расширяется ли `strong` при печати на его правой и левой границе);
  - парсер вставки: HTML → сущности + markup с фильтрацией по политикам (`allowedTags`) и санитизацией (XSS);
  - группировка набранных подряд символов в один шаг undo (в `UndoManager` закомментирован таймер — начало этой задачи);
  - смещения в UTF-16 без учёта графем: разметка и Backspace могут разрезать эмодзи;
  - чужие изменения DOM (Grammarly, перевод страницы): `MutationObserver`.
- `test/unit/segments/*.xjs` тестируют удалённые модули `src/__segments/*`.
- `converter.html` — заброшенный эксперимент. Документация в `docs/entities/*.md` — заглушки на 3–4 строки.

## Правила
- Не заменять команды прямыми правками `state` и DOM: всё идёт через `UndoManager.execute`.
- После перехода на idiomorph: напечатанный в `contenteditable` текст нужно синхронизировать в модель (`setText`) до любой другой команды, иначе `render()` вернёт DOM к состоянию модели.
- Рендер меняет DOM минимально и не трогает его во время composition (IME): между `compositionstart` и `compositionend` рендер откладывается.
- Стиль кода: 2 пробела, одинарные кавычки, без точек с запятой (в `src/vdom` — свой стиль).
