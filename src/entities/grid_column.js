import ContainerEntity from '../container';
import View from '../views/grid_column';

// A Grid Column Entity
// This is an container entity.
export default class extends ContainerEntity {
  constructor(container = null) {
    super(container);

    this.opts = {
      attrs: {
        class: 'easywyg-grid-column'
      },
    };

    this.view = new View;
  }

  get type() {
    return 'grid_column'
  }
}
