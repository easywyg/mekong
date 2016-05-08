import InsertOperation from '../../../src/app/operations/insert';
import Entities from '../../../src/app/entities';

describe('InsertOperation', () => {
  after(function() { document.body.innerHTML = '' });
  let entities;

  beforeEach(function() {
    entities = new Entities();
    let container = (new InsertOperation('RootContainer', {}, document.body)).execute(entities);
    let operation = new InsertOperation('Paragraph', { text: 'hello' }, container);
    operation.execute(entities);
  });

  it('have two entities', () => {
    expect(entities.entities).to.have.lengthOf(2); // root_container and paragraph
  });

  it('have paragraph in entities', () => {
    expect(entities.entities[1].type).to.be.equal('paragraph');
  });
});
