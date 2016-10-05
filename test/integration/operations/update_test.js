import UpdateOperation from '../../../src/operations/update';
import InsertOperation from '../../../src/operations/insert';
import Entities from '../../../src/entities';

describe('Integration:', () => {
  let entities;
  let container;
  let insertOperation;
  let insertedEntity;

  afterEach(function() { document.body.innerHTML = '' });
  beforeEach(function() {
    entities = new Entities();
    container = (new InsertOperation('RootContainer', {}, document.body)).execute(entities);
    insertOperation = new InsertOperation('Paragraph', {
      text: 'Hello world!',
      markup: [
        ['strong', 0, 5]
      ]
    }, container);

    insertedEntity = insertOperation.execute(entities);
  });

  describe('rollback', () => {
    let result;
    beforeEach(function() {
      let updateOperation = new UpdateOperation(insertedEntity, {
        text: 'Yellow',
        start: 0,
        end: 5,
      });

      updateOperation.execute(entities);
      result = updateOperation.rollback(entities);
    });

    it('works', () => {
      expect(document.body.innerHTML).to.be.equal('<p><strong>Hello</strong> world!</p>');
    });

    it('result is null', () => {
      expect(result).to.be.equal(null);
    });
  });
});
