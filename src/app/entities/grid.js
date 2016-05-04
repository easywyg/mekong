//import Entity from '../entity.js';
import ContainerEntity from '../container.js';
import View from '../views/grid.js';

// A Grid Entity
export default class extends ContainerEntity {
  constructor(container = null) {
    super(container);

    this.opts = {
      attrs : {
        class : 'easywyg-grid'
      }
    };

    this.view = new View();
  }

  get type() {
    return 'grid'
  }
}
