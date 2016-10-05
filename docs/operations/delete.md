### A Delete operation

Deletes an Entity.

### Example

Delete paragraph:

```js
  // Insert new <p> first into document.body
  const Mekong = require('mekong');
  const api = new Mekong.Api;
  const container = api.operate('Insert', 'RootContainer', {}, document.body).result;
  const entity = api.operate('Insert', 'Paragraph', { text: 'Hello world!' }, container).result;

  // Delete paragraph entity
  const deleteOperation = api.operate('Delete', entity);

  // Result of delete operation
  console.log(deleteOperation.result); // Will return 'null'

  // Rollback deletion. It will restore deleted paragraph.
  deleteOperation.rollback();
```
