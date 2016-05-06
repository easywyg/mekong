import InsertOperation from '../../../src/app/operations/insert';
import Entities from '../../../src/app/entities';

describe('InsertOperation', () => {
  let entities;

  after(function() { document.body.innerHTML = '' });

  beforeEach(function() {
    let container = document.body;
    let operation = new InsertOperation('Paragraph', { text: 'hello' }, container);
    entities = new Entities();

    operation.execute(entities);
  });

  it('have one entity in entities', () => {
    expect(entities.entities).to.have.lengthOf(1);
  });

  it('have paragraph in entities', () => {
    expect(entities.entities[0].type).to.be.equal('paragraph');
  });
});
