import InsertOperation from '../../../src/operations/insert';
import MoveOperation from '../../../src/operations/move';
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

  it('moves entity to top', () => {
    let moveOperation = new MoveOperation(entity2, entity1);
    moveOperation.execute(entities);

    expect(document.body.innerHTML).to.be.equal('<p>yellow</p><p>hello</p>');
  });
});
