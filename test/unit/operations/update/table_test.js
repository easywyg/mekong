import UpdateOperation from '../../../../src/operations/update';
import InsertOperation from '../../../../src/operations/insert';
import Entities from '../../../../src/entities';

describe('Table Update Operation', () => {
  after(function() { document.body.innerHTML = '' });

  describe('on Table entity', () => {
    describe('updates plain caption text', () => {
      let entities;
      let insertedEntity;

      beforeEach(function() {
        entities = new Entities();

        let container = (new InsertOperation('RootContainer', {}, document.body)).execute(entities);
        let insertOperation = new InsertOperation('Table', { caption : 'hello' }, container);
        insertedEntity = insertOperation.execute(entities);
      });

      it('add new caption to point', () => {
        let operation = new UpdateOperation(insertedEntity, { caption: 'p', start: 0, end: 0 });
        operation.execute(entities);
        expect(entities.entities[1].opts.caption).to.be.equal('phello');
      });

      it('updates caption from point to point', () => {
        let operation = new UpdateOperation(insertedEntity, { caption: 'y', start: 0, end: 2 });
        operation.execute(entities);

        expect(entities.entities[1].opts.caption).to.be.equal('yllo');
      });

      it('deletes caption from point to point', () => {
        let operation = new UpdateOperation(insertedEntity, { caption: '', start: 2, end: 4 });
        operation.execute(entities);
        expect(entities.entities[1].opts.caption).to.be.equal('heo');
      });

      it('does nothing with caption if start or end is wrong', () => {
        let operation = new UpdateOperation(insertedEntity, { caption: 'lol', start: 200, end: 400 });
        operation.execute(entities);
        expect(entities.entities[1].opts.caption).to.be.equal('hello');
      });

      it('does nothing with caption if start or end is null', () => {
        let operation = new UpdateOperation(insertedEntity, { caption: 'yay', start: null, end: null });
        operation.execute(entities);
        expect(entities.entities[1].opts.caption).to.be.equal('hello');
      });

      it('replaces whole caption if start or end is not defined', () => {
        let operation = new UpdateOperation(insertedEntity, { caption: 'yay' });
        operation.execute(entities);
        expect(entities.entities[1].opts.caption).to.be.equal('yay');
      });

      it('does nothing at all if opts are empty', () => {
        let operation = new UpdateOperation(insertedEntity, {});
        operation.execute(entities);
        expect(entities.entities[1].opts.caption).to.be.equal('hello');
      });
    });

    describe('html markup', () => {
      let entities;
      let insertedEntity;

      beforeEach(function() {
        entities = new Entities();

        let container = (new InsertOperation('RootContainer', {}, document.body)).execute(entities);
        let insertOperation = new InsertOperation('Table', {
          caption : '',
          attrs   : {
            table: {
              class: 'easywyg-table'
            },
            caption: {},
          },
          markup : [],
          data: [
            // Row 1
            [
              { text: 'Hello 1', markup: [['strong', 0, 5]], meta: { tag: 'td', attrs: {} } }
            ],
            // Row 2
            [
              { text: 'Hello 3', markup: [], meta: { tag: 'td', attrs: {} } }
            ],
          ]
        }, container);

        insertedEntity = insertOperation.execute(entities);
      });

      it('updates table options', () => {
        let opts = {
          caption : 'Hello world table',
          attrs   : {
            table: {
              class: 'easywyg-table easywyg-table-zebra'
            },
            caption: {
              id: 'xxx'
            },
          },
          markup : [
            ['strong', 0, 5]
          ],
          data: [
            // Row 1
            [
              { text: 'Hello 1', markup: [['strong', 0, 5]], meta: { tag: 'td', attrs: {} } },
              { text: 'Hello 2', markup: [], meta: { tag: 'td', attrs: {} } },
            ],
            // Row 2
            [
              { text: 'Hello 3', markup: [], meta: { tag: 'td', attrs: {} } },
              { text: 'Hello 4', markup: [], meta: { tag: 'td', attrs: {} } },
            ],
          ]
        };

        let operation = new UpdateOperation(insertedEntity, opts);
        operation.execute(entities);

        expect(entities.entities[1].opts).to.deep.equal({
          caption : 'Hello world table',
          attrs   : {
            table: {
              class: 'easywyg-table easywyg-table-zebra'
            },
            caption: {
              id: 'xxx'
            },
          },
          markup : [
            ['strong', 0, 5]
          ],
          data: [
            // Row 1
            [
              { text: 'Hello 1', markup: [['strong', 0, 5]], meta: { _text: 'Hello 1', tag: 'td', attrs: {} } },
              { text: 'Hello 2', markup: [], meta: { tag: 'td', attrs: {} } },
            ],
            // Row 2
            [
              { text: 'Hello 3', markup: [], meta: { _text: 'Hello 3', tag: 'td', attrs: {} } },
              { text: 'Hello 4', markup: [], meta: { tag: 'td', attrs: {} } },
            ],
          ]
        });
      });
    });
  });
});
