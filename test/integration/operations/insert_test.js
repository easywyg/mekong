import InsertOperation from '../../../src/operations/insert';
import Entities from '../../../src/entities';

describe('Integration:', () => {
  afterEach(function() { document.body.innerHTML = '' });
  let entities, entity, operation;

  beforeEach(function() {
    entities = new Entities();
    let container = (new InsertOperation('RootContainer', {}, document.body)).execute(entities);
    operation = new InsertOperation('Paragraph', { text: 'hello' }, container);
    entity = operation.execute(entities);
  });

  it('inserts one entity', () => {
    expect(document.body.innerHTML).to.be.equal('<p>hello</p>');
  });

  describe('rollback', () => {
    let result;

    beforeEach(function() {
      result = operation.rollback(entities);
    });

    it('works', () => {
      expect(document.body.innerHTML).to.be.equal('');
    });

    it('result is null', () => {
      expect(result).to.be.equal(null);
    });
  });
});
