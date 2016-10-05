### A Update operation

Update Entity

### Example

Update paragraph text, attributes and markup.

```js
  const Mekong = require('mekong');
  const api = new Mekong.Api;
  const container = api.operate('Insert', 'RootContainer', {}, document.body).result;
  const entity = api.operate('Insert', 'Paragraph', { text: 'Hello world!' }, container).result;

  // Update paragraph text, attributes and markup
  const updateOperation = api.operate('Update', entity, {
    text: 'Yellow',
    start: 0,
    end: 5,
    attrs: { class: 'headline' },
    markup: [
      ['em', 0, 6],
      ['strong', 0, 6, { class: 'yay' }]
    ]
  });

  // It will give: <p class="headline"><strong class="yay"><em>Yellow</em></strong> world!</p>
  console.log(updateOperation.result());

  // Rollbask to initial state
  updateOperation.rollback();
```
