import Entity from '../entity.js';
import View from '../views/image.js';

// A Image Entity
export default class extends Entity {
  constructor(container = null) {
    super(container);

    this.opts = {
      caption : '',
      attrs   : {
        figure: {
          class: 'easywyg-figure'
        },
        img: {},
        figcaption: {},
        a: {}
      },
      markup  : {}
    };

    this.view = new View();
  }

  get type() {
    return 'image'
  }

  get caption() {
    return this.opts.caption
  }

  get markup() {
    return this.opts.markup
  }
}
