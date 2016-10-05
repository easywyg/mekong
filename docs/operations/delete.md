### A Delete operation

Deletes an Entity.

### Example

Delete paragraph:

```js
  // Insert new <p> first into document.body
  let api = new Api;
  let container = api.operate('Insert', 'RootContainer', {}, document.body).result;
  let entity = api.operate('Insert', 'Paragraph', { text: 'Hello world!' }, container).result;

  // Delete paragraph entity
  let deleteOperation = api.operate('Delete', entity);

  // Result of delete operation
  console.log(deleteOperation.result); // Will return 'null'

  // Rollback deletion. It will restore deleted paragraph.
  deleteOperation.rollback();
```
