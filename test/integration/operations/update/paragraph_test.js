import UpdateOperation from '../../../../src/operations/update';
import InsertOperation from '../../../../src/operations/insert';
import Entities from '../../../../src/entities';

describe('Integration: Paragraph', () => {
  let entities;
  let container;
  let insertOperation;
  let insertedEntity;

  describe('cases 1', () => {
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

    it('update html when markup intersects', () => {
      let operation = new UpdateOperation(insertedEntity, {
        text: 'Yellow',
        start: 0,
        end: 5,
      });

      operation.execute(entities);
      expect(document.body.innerHTML).to.be.equal('<p><strong>Yello</strong>w world!</p>');
    });

    it('toggle markup tags', () => {
      let operation = new UpdateOperation(insertedEntity, {
        text: 'Yellow',
        start: 0,
        end: 5,
        markup: [
          ['strong', 0, 5, { class: 'yay' }]
        ]
      });

      operation.execute(entities);
      expect(document.body.innerHTML).to.be.equal('<p>Yellow world!</p>');
    });
  })

  describe('cases 2', () => {
    afterEach(function() { document.body.innerHTML = '' });
    beforeEach(function() {
      entities = new Entities();
      container = (new InsertOperation('RootContainer', {}, document.body)).execute(entities);
      insertOperation = new InsertOperation('Paragraph', { text: 'hello' }, container);
      insertedEntity = insertOperation.execute(entities);
    })

    it('insert html', () => {
      expect(document.body.innerHTML).to.be.equal('<p>hello</p>');
    });

    it('update html', () => {
      let operation = new UpdateOperation(insertedEntity, { text: 'p', start: 0, end: 0 });
      operation.execute(entities);

      expect(document.body.innerHTML).to.be.equal('<p>phello</p>');
    });

    it('update html, change tag name and attrs', () => {
      let operation = new UpdateOperation(insertedEntity, {
        tag: 'blockquote', attrs: { id: 'xxx', class: 'yyy' }
      });

      operation.execute(entities);
      expect(document.body.innerHTML).to.be.equal('<blockquote id="xxx" class="yyy">hello</blockquote>');
    });

    it('update html, change text and markup', () => {
      let operation = new UpdateOperation(insertedEntity, {
        text: 'jelly',
        markup: [
          ['span', 0, 5],
          ['em', 2, 3],
          ['strong', 0, 5, { id: 'xxx', class: 'yyy' }]
        ]
      });

      operation.execute(entities);
      expect(document.body.innerHTML).to.be.equal(
        '<p><strong id="xxx" class="yyy"><span>je<em>l</em>ly</span></strong></p>'
      );
    });
  });
});
