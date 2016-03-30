import ContainerEntity from './container.es6';

// A Substrate Entity
// This is an container entity!!!
export default class extends ContainerEntity {
  constructor(container = null) {
    super(container);

    this.opts = {
      tag    : 'div',
      attrs  : {
        class: 'easywyg-substrate'
      },
    };
  }
}
