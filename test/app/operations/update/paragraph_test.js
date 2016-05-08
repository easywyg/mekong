import UpdateOperation from '../../../../src/app/operations/update';
import InsertOperation from '../../../../src/app/operations/insert';
import Entities from '../../../../src/app/entities';

describe('Paragraph Update Operation', () => {
  after(function() { document.body.innerHTML = '' });

  describe('on Paragraph entity', () => {
    describe('updates plain text', () => {
      let entities;
      let insertedEntity;

      beforeEach(function() {
        entities = new Entities();

        let container = (new InsertOperation('RootContainer', {}, document.body)).execute(entities);
        let insertOperation = new InsertOperation('Paragraph', { text: 'hello' }, container);
        insertedEntity = insertOperation.execute(entities);
      });

      it('add new text to point', () => {
        let operation = new UpdateOperation(insertedEntity, { text: 'p', start: 0, end: 0 });
        operation.execute(entities);
        expect(entities.entities[1].opts.text).to.be.equal('phello');
      });

      it('updates text from point to point', () => {
        let operation = new UpdateOperation(insertedEntity, { text: 'y', start: 0, end: 2 });
        operation.execute(entities);

        expect(entities.entities[1].opts.text).to.be.equal('yllo');
      });

      it('deletes text from point to point', () => {
        let operation = new UpdateOperation(insertedEntity, { text: '', start: 2, end: 4 });
        operation.execute(entities);
        expect(entities.entities[1].opts.text).to.be.equal('heo');
      });

      it('does nothing with text if start or end is wrong', () => {
        let operation = new UpdateOperation(insertedEntity, { text: 'lol', start: 200, end: 400 });
        operation.execute(entities);
        expect(entities.entities[1].opts.text).to.be.equal('hello');
      });

      it('does nothing with text if start or end is null', () => {
        let operation = new UpdateOperation(insertedEntity, { text: 'yay', start: null, end: null });
        operation.execute(entities);
        expect(entities.entities[1].opts.text).to.be.equal('hello');
      });

      it('replaces whole text if start or end is not defined', () => {
        let operation = new UpdateOperation(insertedEntity, { text: 'yay' });
        operation.execute(entities);
        expect(entities.entities[1].opts.text).to.be.equal('yay');
      });

      it('does nothing at all if opts are empty', () => {
        let operation = new UpdateOperation(insertedEntity, {});
        operation.execute(entities);
        expect(entities.entities[1].opts.text).to.be.equal('hello');
      });
    });

    describe('html markup', () => {
      let entities;
      let insertedEntity;

      beforeEach(function() {
        entities = new Entities();

        let container = (new InsertOperation('RootContainer', {}, document.body)).execute(entities);
        let opts = {
          text: 'hello world',
          markup: [
            ['span', 0, 5]
          ]
        };

        let insertOperation = new InsertOperation('Paragraph', opts, container);
        insertedEntity = insertOperation.execute(entities);
      });

      it('updates', () => {
        let opts = {
          markup: [
            ['strong', 0, 5]
          ]
        };

        let operation = new UpdateOperation(insertedEntity, opts);
        operation.execute(entities);
        expect(entities.entities[1].opts.markup).to.deep.equal([
          ['span', 0, 5],
          ['strong', 0, 5]
        ]);
      });

      it('does not updates', () => {
        let opts = { markup: [] };
        let operation = new UpdateOperation(insertedEntity, opts);
        operation.execute(entities);
        expect(entities.entities[1].opts.markup).to.deep.equal([
          ['span', 0, 5]
        ]);
      });
    });

    describe('tag', () => {
      let entities;
      let insertedEntity;

      beforeEach(function() {
        entities = new Entities();

        let container = (new InsertOperation('RootContainer', {}, document.body)).execute(entities);
        let opts = { text: 'hello world' };

        let insertOperation = new InsertOperation('Paragraph', opts, container);
        insertedEntity = insertOperation.execute(entities);
      });

      it('updates tag name', () => {
        let opts = { tag: 'blockquote' };

        let operation = new UpdateOperation(insertedEntity, opts);
        operation.execute(entities);
        expect(entities.entities[1].opts.tag).to.be.equal('blockquote');
      });

      it('updates tag attrs', () => {
        let opts = { attrs: { id: 'xxx' } };

        let operation = new UpdateOperation(insertedEntity, opts);
        operation.execute(entities);
        expect(entities.entities[1].opts.attrs.id).to.be.equal('xxx');
      });
    });
  });
});


