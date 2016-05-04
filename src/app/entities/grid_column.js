import ContainerEntity from '../container.js';
import View from '../views/grid_column.js';

// A Grid Column Entity
// This is an container entity.
export default class extends ContainerEntity {
  constructor(container = null) {
    super(container);

    this.view = new View;

    this.opts = {
      tag    : 'div',
      attrs  : {
        class: 'easywyg-grid-column'
      },
    };
  }

  get type() {
    return 'grid_column'
  }
}
