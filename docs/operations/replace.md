### A Replace operation

Replaces one Entity with another Entity.

### Example

```js
  // Insert new <p> into document.body
  let api = new Api;
  let container = api.operate('Insert', 'RootContainer', {}, document.body).result;
  let insertOperation1 = api.operate('Insert', 'Paragraph', { text: 'Hello world!' }, container);
  let insertOperation2 = api.operate('Insert', 'Paragraph', { text: 'Yay!' }, container);

  // Replaces 'Hello world!' with 'Yay!'
  let replaceOperation = api.operate('Replace', insertOperation1.result, insertOperation2.result);

  // Rollback replace operation. It will restore initial state.
  replaceOperation.rollback();
```
