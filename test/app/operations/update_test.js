import UpdateOperation from '../../../src/app/operations/update';
import InsertOperation from '../../../src/app/operations/insert';
import Entities from '../../../src/app/entities';

/*
describe('UpdateOperation', () => {
  describe('updates plain text', () => {
    let entities;
    let insertedEntity;

    beforeEach(function() {
      entities = new Entities();

      let container = document.body;
      let insertOperation = new InsertOperation('Paragraph', { text: 'hello' }, container);
      insertedEntity = insertOperation.execute(entities);
    });

    it('add new text to point', () => {
      let operation = new UpdateOperation(insertedEntity, { text: 'y', start: 0, end: 0 });
      operation.execute(entities);
      expect(entities.entities[0].opts.text).to.be.equal('phello');
    });

    it('updates text from point to point', () => {
      let operation = new UpdateOperation(insertedEntity, { text: 'y', start: 0, end: 2 });
      operation.execute(entities);
      expect(entities.entities[0].opts.text).to.be.equal('yell');
    });

    it('deletes text from point to point', () => {
      let operation = new UpdateOperation(insertedEntity, { text: '', start: 2, end: 4 });
      operation.execute(entities);
      expect(entities.entities[0].opts.text).to.be.equal('ye');
    });

    it('does nothing with text if start or end is wrong', () => {
      let operation = new UpdateOperation(insertedEntity, { text: 'lol', start: 200, end: 400 });
      operation.execute(entities);
      expect(entities.entities[0].opts.text).to.be.equal('ye');
    });

    it('does nothing with text if start or end is null', () => {
      let operation = new UpdateOperation(insertedEntity, { text: 'yay', start: null, end: null });
      operation.execute(entities);
      expect(entities.entities[0].opts.text).to.be.equal('ye');
    });

    it('replaces whole text if start or end is not defined', () => {
      let operation = new UpdateOperation(insertedEntity, { text: 'yay' });
      operation.execute(entities);
      expect(entities.entities[0].opts.text).to.be.equal('yay');
    });

    it('does nothing at all if opts are empty', () => {
      let operation = new UpdateOperation(insertedEntity, {});
      operation.execute(entities);
      expect(entities.entities[0].opts.text).to.be.equal('yay');
    });
  });

  describe('updates html markup', () => {
    let entities;
    let insertedEntity;

    beforeEach(function() {
      entities = new Entities();

      let container = document.body;
      let insertOperation = new InsertOperation('Paragraph', { text: 'hello world' }, container);
      insertedEntity = insertOperation.execute(entities);
    });

    it('add new text to point', () => {
      let opts = {
        markup: [
          ['strong', 0, 5]
        ]
      };

      let operation = new UpdateOperation(insertedEntity, opts);
      operation.execute(entities);
      expect(entities.entities[0].opts.text).to.be.equal('phello'); // ???
    });
  });
});
*/
