### A Move operation

Moves an Entity.

### Example

Move one entity before another:

```js
  // Insert new <p> into document.body
  const Mekong = require('mekong');
  const api = new Mekong.Api;
  const container = api.operate('Insert', 'RootContainer', {}, document.body).result;
  const insertOperation1 = api.operate('Insert', 'Paragraph', { text: 'Hello world!' }, container);
  const insertOperation2 = api.operate('Insert', 'Paragraph', { text: 'Yay!' }, container);

  // Move 'Hello world!' before 'Yay!'
  const moveOperation = api.operate('Move', insertOperation2.result, insertOperation1.result);

  // Rollback move operation. It will move 'Hello world!' before 'Yay!'.
  moveOperation.rollback();
```
