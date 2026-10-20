# План: модернизация тулчейна Mekong

## Context
Тулчейн проекта застрял в 2017 году (Babel 6, webpack 2, gulp 3 + browserify, mocha 2, jsdom 8, yarn v1), и на Node 20+ проект не собирается. `src/lib/` (mix.js, entity_utils.js) никогда не попадал в git из-за правила `lib` в `.gitignore`. Импорты от корня `src/` (`undo_manager/command.js`) понимает только webpack. `npm test` работает в режиме `--watch`. Цель: привести проект в рабочее современное состояние (ESM, Vite, Vitest, pnpm, Node 22) и получить зелёный baseline тестов. **Логику и найденные баги не трогаем**, кроме того, без чего не запустится сборка. Тесты, которые падают из-за известных багов, помечаем `it.todo`/`it.fails` со ссылкой на CLAUDE.md.

Решения пользователя: Vite (library mode), Vitest + jsdom, остаёмся на JS (TS позже), только ESM, src/lib пишем заново, ESLint 9 flat без форматтера, pnpm + Node 22 LTS, пакет переименовываем в `mekong`, отключённые тесты возвращаем. vdom-форк **не переводим на ESM, а заменяем** на h() + idiomorph (шаг 4).

Копия плана лежит в корне репозитория: `TOOLCHAIN_PLAN.md`.

## Шаг 0. CLAUDE.md
Создать `CLAUDE.md` в корне с разделами:
- **О проекте** — model layer rich-text редактора; Document = плоский список Entity, рендер через форк virtual-dom, все изменения идут через Command + UndoManager.
- **Структура** — `src/api.js` (Mekong + DI-объект `core`), `document.js`, `entity.js`/`view.js`/`policy.js`, `commands/{document,entity}`, `mixins/`, `segments/` (SegmentCalculator → VTreeBuilder), `entities/*` (фабрики `function(core) { return class … }`: entity + view + policy + commands), `vdom/`, `test/{unit,integration}`, `stage.html`. Формат markup: `[tag, start, end, attrs]`.
- **Команды** — сборка, тесты, линтер, dev-сервер (заполнить после модернизации).
- **Баги в существующем коде** и **Незавершённые фичи** — дословно из предыдущего анализа (segment_calculator `remove.add`, `Document.replace` → Remove, `lineBreak(this)`, join сдвигает только end, split → всегда paragraph, `!this.isTagChanged`, mutate без lineBreaks, RemoveAttr truthy, update_markup_attrs, `use({})`, redo без проверки, `compactMarkup` пишет `.start` в массив; Move/LineBreak — заглушки, `load()/html()` пустые, Entity insert/move/replace закомментированы, List/Grid/Table недоделаны, нет Image/Embed/Substrate/DefinitionList, docs-заглушки, `converter.html`).

## Шаг 1. Пакет и окружение
- `package.json`: `"name": "mekong"`, `"type": "module"`, `"version": "0.1.0"`, `"private"` не ставим; `exports: { ".": "./dist/mekong.js" }`, `module`/`main` → `dist/mekong.js`, `files: ["dist"]`, `engines.node: ">=22"`, `packageManager: "pnpm@<актуальная>"`.
- Скрипты: `dev` (vite, отдаёт stage.html), `build` (vite build), `test` (vitest run), `test:watch` (vitest), `lint` (eslint .).
- Удалить: `yarn.lock`, `.babelrc`, `gulpfile.babel.js`, `webpack.config.js`, `.eslintrc.json`, все babel-, webpack-, gulp-, browserify- и mocha-зависимости, а также `requirejs`, `node-uuid`, `browser-split`, `error`, `ev-store`, `next-tick`.
- Добавить devDependencies: `vite`, `vitest`, `jsdom`, `eslint`, `@eslint/js`, `globals`. В runtime остаётся только `deepmerge` (последняя версия; проверить, что `merge(a, b)` для объектов/массивов ведёт себя так же, иначе передать `arrayMerge`).
- `.nvmrc` → `22`. `.gitignore`: `lib` → `/lib`, плюс `dist`, `node_modules`, `coverage`.
- `.npmignore` удалить (вместо него поле `files`).

## Шаг 2. Восстановить `src/lib/`
- `src/lib/mix.js` — классический паттерн: `mix(superclass).with(...mixins)` = `mixins.reduce((c, m) => m(c), superclass)`. Используется как `core.Lib.Mix(core.Entity).with(...)`.
- `src/lib/entity_utils.js` — `export default { updateText(oldText, newText, start, end) }`. Если `start == null` или `end == null`, возвращается `newText` целиком, иначе `oldText.slice(0, start) + newText + oldText.slice(end)`. Поведение сверено с `test/integration/entities/paragraph_text.js` (`setText('peace', 7, 12)` → `Yellow peace!`).

## Шаг 3. Импорты и ESM
- Bare-импорты от `src/` (`undo_manager/command.js`, `commands/...`, `lib/...`) заменить на алиас `@/`, объявив его в `vite.config.js` `resolve.alias` (его же использует Vitest). Альтернатива — снова сделать пути относительными. Рекомендую алиас, чтобы сохранить намерение последнего коммита «Get rid of relative paths».
- Добавить расширения в импорты без `.js` (`segments/segment/*.js` → `'./base'`).
- `src/ext.js`: `String.isString` (patch глобального прототипа) оставить как есть — это логика, а не тулчейн.
- `src/api.js`: `require('./ext.js')` → `import './ext.js'`.
- Class fields / `static` поддерживаются нативно, плагины Babel не нужны; flow-синтаксиса в коде нет (проверить `grep`).

## Шаг 4. Замена vdom на h() + idiomorph (вместо перевода форка на ESM)

### Вывод: заменить можно, и это оправдано
Связь с vdom узкая: конструкторы `VNode`/`VText` во views и `VTreeBuilder`, три функции `create/diff/patch` в командах документа, плюс доработка форка (связь `node.entity` ↔ `entity.node`). Форк virtual-dom (2016) сравнивает новое дерево со **своим прошлым vdom**, а не с DOM. При обычной печати в `contenteditable` (так решено) браузер меняет DOM мимо vdom, и следующий `patch` попадает в неверные узлы. idiomorph сравнивает с **реальным DOM**, поэтому такой рассинхрон его не ломает.

Решения пользователя: h() + morph по реальному DOM; лёгкая runtime-зависимость допустима; команды меняют только state; рендер только в браузере; выделение и каретку хранит wysiwyg-редактор поверх Mekong (в Mekong передаются только смещения `start/end` или позиция каретки); выделение через несколько сущностей решим позже.

### Новая схема рендера
- **`src/render/h.js`** — `h(tag, attrs, ...children)` → простой объект `{tag, attrs, children}`, текст — строка. Без классов и без ссылок на сущности.
- **`src/render/to_dom.js`** — описание → `DocumentFragment` / `Element` (через `root.ownerDocument`).
- **`Document.render()`** — собирает описание всех сущностей верхнего уровня (`state.entities` с `parentEntity === document`, в порядке массива). Затем `Idiomorph.morph(root, fragment, { morphStyle: 'innerHTML' })`. После морфинга заново связывает `entity.node = root.children[i]`. Порядок совпадает по построению, поэтому служебные атрибуты (`data-id`) в DOM не нужны и HTML в тестах не меняется.
- **Когда рендерим:** `UndoManager` после успешных `execute/undo/redo` вызывает `changed()`. Его переопределяем в Document → `this.render()`. `Entity.changeState()` и `onStateChange` больше не патчат DOM. Если в будущем понадобятся пакетные операции (составная команда), рендер будет один раз в конце.
- **Команды становятся state-only:** из `create/remove/replace/mutate/split/join` убрать `insertBefore/removeChild/replaceChild/VDOM.create`, а также поля `node`/`vtree`/`parent`. Остаётся только правка `doc.state.entities` (позиция вставки — индекс в массиве, вычисленный из `insertPos.after/before`) и `entity.state`. Undo/redo от этого упрощаются (сейчас redo заново создаёт DOM вручную).
- **Views:** `new this.vnode(entity, {attributes: attrs}, children)` → `h(entity.state.tag, attrs, children)`; `new this.vtext(s)` → `s`. В `VTreeBuilder` — то же самое (логика стека тегов не меняется). `View.buildMarkup` возвращает массив описаний.
- **Удаляется:** `src/vdom/**` целиком (вместе с tape-тестами), `core.VDOM`, `entity.vtree`, зависимости `x-is-array`, `is-object`, `global`, `ev-store`, `next-tick`.
- **Зависимость:** `idiomorph` (npm, ESM-экспорт `Idiomorph`; версию и сигнатуру опций сверить при установке, context7 сейчас недоступен).

### Требования к рендереру (из принципа обработки ввода)
Браузеру разрешена только вставка напечатанных символов, всё остальное Mekong делает командами (см. CLAUDE.md, «Обработка ввода»). Поэтому `Document.render()` должен с самого начала:

1. **Менять DOM минимально.** Узлы неизменённых сущностей не трогаются вовсе. Внутри изменённой сущности текстовые узлы с тем же содержимым сохраняются (idiomorph так и делает — проверить тестом). Иначе ломается каретка, которую держит wysiwyg-слой, и сбивается позиция скринридера.
2. **Не трогать DOM во время composition (IME, Android).** Document слушает `compositionstart`/`compositionend` на корневом узле. Пока идёт composition, `render()` только помечает документ «грязным». На `compositionend` выполняется один отложенный рендер.
3. **Держать связь сущность ↔ DOM-узел актуальной** после каждого рендера (`entity.node`). На ней будет строиться перевод DOM-позиций в смещения модели и синхронизация напечатанного текста.

Ограничение, которое остаётся после модернизации: напечатанный текст, ещё не переданный в модель (`setText`), следующий `render()` сотрёт. Кто синхронизирует напечатанное в модель (Mekong через `syncFromDOM(entity)` или wysiwyg-слой), пока **не решено**, это не часть модернизации. Рекомендация: Mekong, потому что соответствие DOM и модели знает именно он.

### Вне объёма (не трогаем)
List, Grid и Table сейчас не работают и тестов не имеют. Их views переводим на `h()` механически, без починки (баги остаются в CLAUDE.md). Вложенные сущности (колонки Grid) рендерит view родителя.

## Шаг 5. Vite
`vite.config.js`:
- `resolve.alias: { '@': '/src' }`.
- `build.lib: { entry: 'src/api.js', formats: ['es'], fileName: 'mekong' }`, `rollupOptions.external: ['deepmerge']`, `sourcemap: true`.
- `test: { environment: 'jsdom', setupFiles: ['test/setup.js'], include: ['test/**/*.test.js'] }`.
- `stage.html`: `<script type="module">import Mekong from '/src/api.js'` вместо `build/mekong.js` + `require('mekong')`. Для `pnpm dev` указать `server.open: '/stage.html'`.
- `converter.html` удалить (заброшенный эксперимент, не связан с кодом).

## Шаг 6. Тесты на Vitest
- `test/test_helper.js` → `test/setup.js`. jsdom даёт сам Vitest, chai `expect` встроен (`globals: true` даёт describe/it/expect). Глобальные `container`, `content`, `clearContent`, `clearContentWithEntities`, `mekong` сохраняются, чтобы не трогать тесты. Хелперы `builderHtml`/`vdomBuilderHtml` удалить (они для удалённых модулей).
- Тесты переименовать в `*.test.js`. Это integration-тесты с общим состоянием между `it` в одном файле. Vitest изолирует файлы, поэтому `mekong` создаётся в `beforeAll` на файл. Проверить, что ни один тест не опирается на состояние другого файла (сейчас всё в одном процессе mocha).
- `xit` → `it.skip`. Тесты move оставить skip (фича не реализована).
- `test/integration/document/relpace.js` → `replace.test.js` (опечатка).
- `test/unit/segments/builder_test.xjs` и `vdom_builder_test.xjs` проверяют удалённые в «Fix HUGE bug» `src/__segments/builder.js`/`vdom_builder.js`. Кейсы (входной markup → ожидаемый HTML) перенести в новый `test/unit/segments/vtree_builder.test.js` на текущих `SegmentCalculator` + `VTreeBuilder`, старые файлы удалить. Падающие кейсы пометить `it.fails` со ссылкой на баг.
- Первый прогон: зафиксировать, какие тесты падают из-за багов логики, и пометить их (а не чинить).

## Шаг 7. ESLint 9
`eslint.config.js` (flat): `@eslint/js` recommended, `globals.browser` для `src`, `globals.node` и vitest-глобалы для `test`. Правила из старого `.eslintrc.json` (indent 2, single quotes, unix linebreaks, `semi: never`) перевести как `warn`, чтобы не переформатировать код массово. `src/vdom/**` линтить с ослабленными правилами (чужой стиль с `;` и 4 пробелами).

## Шаг 8. README
Обновить разделы «Build» и «Tests» (`pnpm install`, `pnpm dev`, `pnpm build`, `pnpm test`), исправить `useEntity` → `use` в примере, убрать битую ссылку `table_cell.md`. В CLAUDE.md заполнить «Команды».

## Порядок коммитов (на ветке `chore/modern-toolchain` от `develop`)
1. CLAUDE.md + TOOLCHAIN_PLAN.md
2. pnpm + package.json + .gitignore + удаление старого тулчейна
3. src/lib + алиасы импортов
4. Vite + Vitest + миграция тестов (файлы и setup; тесты пока красные)
5. h() + idiomorph, команды state-only, удаление `src/vdom` → тесты зелёные (baseline на старом vdom невозможен: CJS-форк в `src` при `"type": "module"` не загрузится)
6. ESLint 9
7. README

Integration-тесты (`test/integration/**`, проверяют `innerHTML`) — это приёмочные тесты замены рендерера: ожидаемый HTML не меняется.

## Verification
- `pnpm install` на Node 22 без ошибок и deprecated-пиров.
- `pnpm test`: все тесты зелёные, кроме явно помеченных `skip`/`fails`/`todo` с причиной. Особенно важно: прошли `paragraph_text` (проверка `updateText`) и `paragraph_markup` (проверка mix + segments).
- Новые unit-тесты: `h`/`to_dom`; `Document.render()` сохраняет DOM-узлы неизменённых сущностей (`entity.node` до и после `setText` у соседа — тот же объект); после ручной правки текста в DOM рендер восстанавливает состояние модели; у изменённой сущности текстовый узел с неизменённым текстом остаётся тем же объектом; между `compositionstart` и `compositionend` команды не меняют DOM, а после `compositionend` DOM соответствует модели.
- `grep -r "vdom\|VNode\|VText\|vtree" src` — пусто.
- `pnpm build` выдаёт `dist/mekong.js` (ESM). Проверка: `node -e "import('./dist/mekong.js').then(m => console.log(typeof m.default))"` → `function`.
- `pnpm dev`, затем открыть `stage.html`: виден параграф `<p><strong>Hell<u>o</u></strong> <em><u>w</u>orld</em>!</p>`, без ошибок в консоли.
- `pnpm lint` проходит без errors (warnings допустимы).
