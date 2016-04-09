import ContainerEntity from '../container.es6';
import View from '../views/root_container.es6';

// A Root Container Entity
export default class extends ContainerEntity {
  constructor(container = null) {
    super(container);

    this.view = new View;
    this.opts = {};
  }

  get type() {
    return 'root_container'
  }
}
