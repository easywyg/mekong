import UpdateOperation from '../../src/app/operations/update';
import InsertOperation from '../../src/app/operations/insert';
import Entities from '../../src/app/entities';

describe('Integration: Embed', () => {
  let entities;
  let container;
  let insertOperation;
  let insertedEntity;

  afterEach(function() { document.body.innerHTML = '' });
  beforeEach(function() {
    entities = new Entities();
    container = (new InsertOperation('RootContainer', {}, document.body)).execute(entities);
    insertOperation = new InsertOperation('Embed', {}, container);
    insertedEntity = insertOperation.execute(entities);
  })

  it('insert html', () => {
    expect(document.body.innerHTML).to.be.equal(
      '<div class="easywyg-embed"></div>'
    );
  });

  it('update html', () => {
    let operation = new UpdateOperation(insertedEntity, {
      attrs: { class: 'pretty-embed' }
    });

    operation.execute(entities);
    expect(document.body.innerHTML).to.be.equal(
      '<div class="pretty-embed"></div>'
    );
  });
});
