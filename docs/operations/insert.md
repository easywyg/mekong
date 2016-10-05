### A Insert operation

Deletes an Entity.

### Example

Delete paragraph:

```js
  // Insert new <p> into document.body
  let api = new Api;
  let container = api.operate('Insert', 'RootContainer', {}, document.body).result;
  let insertOperation = api.operate('Insert', 'Paragraph', { text: 'Hello world!' }, container);

  // Result of insert operation
  console.log(insertOperation.result); // Will return paragraph Entity

  // Rollback insertion. It will delete paragraph.
  insertOperation.rollback();
```

