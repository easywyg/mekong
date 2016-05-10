import InsertOperation from '../../../src/operations/insert';
import ReplaceOperation from '../../../src/operations/replace';
import Entities from '../../../src/entities';

describe('ReplaceOperation', () => {
  after(function() { document.body.innerHTML = '' });
  let entities, entity1, entity2;

  beforeEach(function() {
    entities = new Entities();
    let container = (new InsertOperation('RootContainer', {}, document.body)).execute(entities);
    let operation1 = new InsertOperation('Paragraph', { text: 'hello' }, container);
    entity1 = operation1.execute(entities);

    let operation2 = new InsertOperation('Paragraph', { text: 'yellow' }, container);
    entity2 = operation2.execute(entities);

    let replaceOperation = new ReplaceOperation(entity1, entity2);
    replaceOperation.execute(entities);
  });

  it('have two entities', () => {
    console.log(entities.entities)
    expect(entities.entities).to.have.lengthOf(2);
  });

  it('replaces one entity with another', () => {
    expect(entities.entities[1].opts.text).to.be.equal('yellow');
  });
});
