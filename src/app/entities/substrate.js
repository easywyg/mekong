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

  set options(opts) {
    this.modified = true;

    // Обновляем опции
    Object.assign(this.opts, opts);
  }

  get type() {
    return 'substrate'
  }
}
