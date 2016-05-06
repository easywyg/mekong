import UpdateOperation from '../../src/app/operations/update/paragraph';
import InsertOperation from '../../src/app/operations/insert';
import Entities from '../../src/app/entities';

describe('Integration: Paragraph', () => {
  let entities;
  let container;
  let insertOperation;
  let insertedEntity;

  afterEach(function() { document.body.innerHTML = '' });
  beforeEach(function() {
    entities = new Entities();
    container = document.body;
    insertOperation = new InsertOperation('Paragraph', { text: 'hello' }, container);
    insertedEntity = insertOperation.execute(entities);
  })

  it('insert html', () => {
    expect(container.innerHTML).to.be.equal('<p>hello</p>');
  });

  it('update html', () => {
    let operation = new UpdateOperation(insertedEntity, { text: 'p', start: 0, end: 0 });
    operation.execute(entities);

    expect(container.innerHTML).to.be.equal('<p>phello</p>');
  });

  it('update html, change tag name and attrs', () => {
    let operation = new UpdateOperation(insertedEntity, {
      tag: 'blockquote', attrs: { id: 'xxx', className: 'yyy' }
    });

    operation.execute(entities);
    expect(container.innerHTML).to.be.equal('<blockquote id="xxx" class="yyy">hello</blockquote>');
  });

  it('update html, change text and markup', () => {
    let operation = new UpdateOperation(insertedEntity, {
      text: 'jelly',
      markup: [
        ['span', 0, 5],
        ['em', 2, 3],
        ['strong', 0, 5, { id: 'xxx', className: 'yyy' }]
      ]
    });

    operation.execute(entities);
    expect(container.innerHTML).to.be.equal(
      '<p><strong id="xxx" class="yyy"><span>je<em>l</em>ly</span></strong></p>'
    );
  });
});