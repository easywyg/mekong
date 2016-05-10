import InsertOperation from '../../../src/operations/insert';
import Entities from '../../../src/entities';
import Serialize from '../../../src/serialize.js';

describe('Serialize', () => {
  after(function() { document.body.innerHTML = ''; });

  it('insert operation', () => {
    let entities = new Entities();
    let container = (new InsertOperation('RootContainer', {}, document.body)).execute(entities);
    let operation = new InsertOperation('Paragraph', { text: 'hello' }, container);
    let serializer = Serialize(operation);

    operation.execute(entities);

    expect(serializer.serialize()).to.be.a.matchSerialized({
      entity: "Paragraph",
      opts: {
        text: "hello"
      },
      type: "Insert"
    });
  });
});
