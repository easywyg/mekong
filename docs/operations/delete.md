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
  let deleteOparation = api.operate('Delete', entity);

  // Result of delete operation
  console.log(deleteOparation.result); // Will return 'null'

  // Rollback (reverse) deletion. It will restore deleted paragraph.
  deleteOparation.reverse();
```
