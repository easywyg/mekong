# Mekong
A Rich text editor Model layer. (not finished yet)

### Quick example

```js
  import Mekong from 'mekong';

  const mekong = new Mekong(document.getElementById('body'));
  mekong.useEntity('Paragraph');

  // Create paragraph with markup
  const p1 = mekong.create('Paragraph', { tag: 'p', attrs: {} });
  p1.setText('Hello world!')
  p1.setMarkup('strong', 0, 5)
  p1.setMarkup('em', 6, 11)
  p1.setMarkup('u', 4, 7)

  // It gives: <p><strong>Hell<u>o</u></strong> <em class="x1 x2"><u>w</u>orld</em>!</p>
```

### Entities

Entity is a building block, such as paragraph, image, table and others.

##### Types of built-in entities

* [Document](docs/entities/document.md)
* [Embed](docs/entities/embed.md)
* [Grid](docs/entities/grid.md)
* [Image](docs/entities/image.md)
* [List](docs/entities/list.md)
* [Paragraph](docs/entities/paragraph.md)
* [Substrate](docs/entities/substrate.md)
* [Table](docs/entities/table.md)
* [DefinitionList](docs/entities/table_cell.md)

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
