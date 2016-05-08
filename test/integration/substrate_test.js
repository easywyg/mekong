import UpdateOperation from '../../src/app/operations/update';
import InsertOperation from '../../src/app/operations/insert';
import Entities from '../../src/app/entities';

describe('Integration: Substrate', () => {
  let entities;
  let container;
  let insertOperation;
  let insertedEntity;

  afterEach(function() { document.body.innerHTML = '' });
  beforeEach(function() {
    entities = new Entities();
    container = (new InsertOperation('RootContainer', {}, document.body)).execute(entities);
    insertOperation = new InsertOperation('Substrate', {}, container);
    insertedEntity = insertOperation.execute(entities);
  })

  it('insert html', () => {
    expect(document.body.innerHTML).to.be.equal(
      '<div class="easywyg-substrate"></div>'
    );
  });

  it('update html', () => {
    let operation = new UpdateOperation(insertedEntity, {
      attrs: { class: 'pretty-substrate' }
    });

    operation.execute(entities);
    expect(document.body.innerHTML).to.be.equal(
      '<div class="pretty-substrate"></div>'
    );
  });
});
