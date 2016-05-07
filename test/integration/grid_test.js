import UpdateOperation from '../../src/app/operations/update';
import InsertOperation from '../../src/app/operations/insert';
import Entities from '../../src/app/entities';

describe('Integration: Grid', () => {
  let entities;
  let container;
  let insertGridOperation;
  let grid;
  let gridColumn1;
  let gridColumn2;

  afterEach(function() { document.body.innerHTML = '' });
  beforeEach(function() {
    entities = new Entities();
    container = document.body;
    insertGridOperation = new InsertOperation('Grid', {}, container);
    grid = insertGridOperation.execute(entities);

    gridColumn1 = (new InsertOperation('GridColumn', {}, grid.view.el)).execute(entities);
    gridColumn2 = (new InsertOperation('GridColumn', {}, grid.view.el)).execute(entities);
  })

  it('insert html', () => {
    expect(container.innerHTML).to.be.equal(
      '<div class="easywyg-grid"><div class="easywyg-grid-column"></div>' +
      '<div class="easywyg-grid-column"></div></div>'
    );
  });

  it('update html', () => {
    let operation = new UpdateOperation(grid, {
      attrs: { class: "pretty-grid" }
    });

    operation.execute(entities);

    (new UpdateOperation(gridColumn1, {
      attrs: { class: "pretty-grid-column" }
    })).execute(entities);

    expect(container.innerHTML).to.be.equal(
      '<div class="pretty-grid"><div class="pretty-grid-column"></div>' +
      '<div class="easywyg-grid-column"></div></div>'
    );
  });
});
