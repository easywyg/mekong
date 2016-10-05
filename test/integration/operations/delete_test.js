import InsertOperation from '../../../src/operations/insert';
import DeleteOperation from '../../../src/operations/delete';
import Entities from '../../../src/entities';

describe('Integration:', () => {
  afterEach(function() { document.body.innerHTML = '' });
  let entities, entity;

  beforeEach(function() {
    entities = new Entities();
    let container = (new InsertOperation('RootContainer', {}, document.body)).execute(entities);
    let operation = new InsertOperation('Paragraph', { text: 'hello' }, container);
    entity = operation.execute(entities);
  });

  it('deletes entity from html', () => {
    let delOperation = new DeleteOperation(entity);
    delOperation.execute(entities);

    expect(document.body.innerHTML).to.be.equal('');
  });

  describe('rollback', () => {
    let result;
    beforeEach(function() {
      let delOperation = new DeleteOperation(entity);
      delOperation.execute(entities);
      result = delOperation.rollback(entities);
    });

    it('works', () => {
      expect(document.body.innerHTML).to.be.equal('<p>hello</p>');
    });

    it('result is null', () => {
      expect(result).to.be.equal(null);
    });
  });
});
