//import Entity from '../entity.es6';
import ContainerEntity from '../container.es6';
import View from '../views/grid.es6';

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
