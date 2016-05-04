import ContainerEntity from '../container.js';
import View from '../views/substrate.js';

// A Substrate Entity
// This is an container entity!!!
export default class extends ContainerEntity {
  constructor(container = null) {
    super(container);

    this.view = new View;

    this.opts = {
      tag    : 'div',
      attrs  : {
        class: 'easywyg-substrate'
      },
    };
  }

  get type() {
    return 'substrate'
  }
}
