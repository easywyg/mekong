import InsertOperation from '../../../src/operations/insert';
import UpdateOperation from '../../../src/operations/update';
import Entities from '../../../src/entities';
import Serialize from '../../../src/serialize.js';

describe('Serialize', () => {
  after(function() { document.body.innerHTML = ''; });

  it('update operation', () => {
    let entities = new Entities();
    let container = (new InsertOperation('RootContainer', {}, document.body)).execute(entities);

    let insertOperation = new InsertOperation('Paragraph', { text: 'hello' }, container);
    let insertedEntity = insertOperation.execute(entities);

    let operation = new UpdateOperation(insertedEntity, {
      text: 'jelly',
      markup: [
        ['span', 0, 5],
        ['em', 2, 3],
        ['strong', 0, 5, { id: 'xxx', class: 'yyy' }]
      ]
    });

    operation.execute(entities);

    let serializer = Serialize(operation);

    expect(serializer.serialize()).to.be.a.matchSerialized({
      opts: {
        "markup": [
          ["span", 0, 5],
          ["em", 2, 3],
          ["strong", 0, 5, { class: "yyy", id: "xxx" } ]
        ],
        text: "jelly"
      },
      type: "Update"
    });
  });
});
