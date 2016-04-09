import ContainerEntity from '../container.es6';
import View from '../views/substrate.es6';

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
