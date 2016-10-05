### A Insert operation

Deletes an Entity.

### Example

Delete paragraph:

```js
  // Insert new <p> into document.body
  const Mekong = require('mekong');
  const api = new Mekong.Api;
  const container = api.operate('Insert', 'RootContainer', {}, document.body).result;
  const insertOperation = api.operate('Insert', 'Paragraph', { text: 'Hello world!' }, container);

  // Result of insert operation
  console.log(insertOperation.result); // Will return paragraph Entity

  // Rollback insertion. It will delete paragraph.
  insertOperation.rollback();
```

