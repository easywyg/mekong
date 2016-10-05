# Mekong
A Rich text editor Model layer. (not finished yet)

### Quick example

```js
  // Insert new <p> into document.body
  const Mekong = require('mekong');
  const api = new Mekong.Api;
  const container = api.operate('Insert', 'RootContainer', {}, document.body).result;
  const entity = api.operate('Insert', 'Paragraph', { text: 'Hello world!' }, container).result;

  // Update paragraph text
  api.operate('Update', entity, {
    text: 'Yellow',
    start: 0,
    end: 5,
    attrs: { class: 'headline' },
    markup: [
      ['em', 0, 6],
      ['strong', 0, 6, { class: 'yay' }]
    ]
  });

  // It gives: <p class="headline"><strong class="yay"><em>Yellow</em></strong> world!</p>

```

### Entities

Entity is a building block, such as paragraph, image, table and others.

##### Types of built-in entities

* [Embed](docs/entities/embed.md)
* [Grid](docs/entities/grid.md)
* [Image](docs/entities/image.md)
* [List](docs/entities/list.md)
* [Paragraph](docs/entities/paragraph.md)
* [RootContainer](docs/entities/root_container.md)
* [Substrate](docs/entities/substrate.md)
* [Table](docs/entities/table.md)

### Operations
All actions on the text and HTML markup are made only via operations. You don't have to work with DOM directly, you just execute operations and things are done.

##### Types of operations

* [Delete](docs/operations/delete.md) - remove entity.
* [Insert](docs/operations/insert.md) - insert entity.
* [Move](docs/operations/move.md) - move antity after another.
* [Replace](docs/operations/replace.md) - replace one entity with another.
* [Transfer](docs/operations/transfer.md) - put entity into container entity (`Substrate`, `GridColumn` or `RootContainer`).
* [Transform](docs/operations/transform.md) - transform one entity into another, if it is transformable.
* [Update](docs/operations/update.md) - update entity text, markup or another data.

##### Virtual DOM

Mekong utilizes virtual DOM to partially update HTML markup.

### Build from sources
```
gulp build
```

### Running tests
```
npm run test
```
