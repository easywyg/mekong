import Entity from '../entity.js';
import View from '../views/grid.js';

// A Grid Entity
export default class extends Entity {
  constructor(container = null) {
    super(container);

    this.opts = {
      attrs : {
        class: 'easywyg-grid'
      }
    };

    this.view = new View();
  }

  get type() {
    return 'grid'
  }
}
