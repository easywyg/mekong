import UpdateOperation from '../../src/app/operations/update/table';
import InsertOperation from '../../src/app/operations/insert';
import Entities from '../../src/app/entities';

describe('Integration: Table', () => {
  let entities;
  let container;
  let insertOperation;
  let insertedEntity;

  afterEach(function() { document.body.innerHTML = '' });
  beforeEach(function() {
    entities = new Entities();
    container = document.body;
    insertOperation = new InsertOperation('Table', {
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
  })

  it('insert html', () => {
    expect(container.innerHTML).to.be.equal(
      '<table class="easywyg-table"><tbody><tr><td><strong>Hello</strong> 1</td></tr><tr><td>Hello 3</td></tr></tbody></table>'
    );
  });

  it('update html', () => {
    let operation = new UpdateOperation(insertedEntity, {
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

    operation.execute(entities);
    expect(container.innerHTML).to.be.equal(
      '<table class="easywyg-table easywyg-table-zebra">' +
      '<caption id="xxx"><strong>Hello</strong> world table</caption>' +
      '<tbody><tr><td><strong>Hello</strong> 1</td><td>Hello 2</td></tr>' +
      '<tr><td>Hello 3</td><td>Hello 4</td></tr></tbody></table>'
    );
  });
});
