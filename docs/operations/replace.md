### A Replace operation

Replaces one Entity with another Entity.

### Example

```js
  // Insert new <p> into document.body
  const Mekong = require('mekong');
  const api = new Mekong.Api;
  const container = api.operate('Insert', 'RootContainer', {}, document.body).result;
  const insertOperation1 = api.operate('Insert', 'Paragraph', { text: 'Hello world!' }, container);
  const insertOperation2 = api.operate('Insert', 'Paragraph', { text: 'Yay!' }, container);

  // Replaces 'Hello world!' with 'Yay!'
  const replaceOperation = api.operate('Replace', insertOperation1.result, insertOperation2.result);

  // Rollback replace operation. It will restore initial state.
  replaceOperation.rollback();
```
