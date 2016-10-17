import ContainerEntity from '../container';
import View from '../views/substrate';

// A Substrate Entity
// This is an container entity!!!
export default class extends ContainerEntity {
  constructor(container = null) {
    super(container);

    this.view = new View;

    this.opts = {
      tag   : 'div',
      attrs : {}
    };
  }

  get type() {
    return 'substrate'
  }
}
