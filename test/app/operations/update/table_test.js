import UpdateOperation from '../../../../src/app/operations/update/table';
import InsertOperation from '../../../../src/app/operations/insert';
import Entities from '../../../../src/app/entities';

describe('Table Update Operation', () => {
  after(function() { document.body.innerHTML = '' });

  describe('on Table entity', () => {
    let entities;
    let insertedEntity;

    beforeEach(function() {
      entities = new Entities();

      let container = document.body;
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

      expect(entities.entities[0].opts).to.deep.equal({
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
      });
    });
  });
});
