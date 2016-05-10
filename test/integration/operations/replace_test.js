import InsertOperation from '../../../src/operations/insert';
import ReplaceOperation from '../../../src/operations/replace';
import Entities from '../../../src/entities';

describe('Integration:', () => {
  after(function() { document.body.innerHTML = '' });
  let entities, entity1, entity2;

  beforeEach(function() {
    entities = new Entities();
    let container = (new InsertOperation('RootContainer', {}, document.body)).execute(entities);
    let operation1 = new InsertOperation('Paragraph', { text: 'hello' }, container);
    entity1 = operation1.execute(entities);

    let operation2 = new InsertOperation('Paragraph', { text: 'yellow' }, container);
    entity2 = operation2.execute(entities);
  });

  it('replaces one entity with another', () => {
    let replaceOperation = new ReplaceOperation(entity1, entity2);
    replaceOperation.execute(entities);

    expect(document.body.innerHTML).to.be.equal('<p>yellow</p>');
  });
});
