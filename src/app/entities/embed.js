import Entity from '../entity.js';
import View from '../views/embed.js';

// A Embed Entity
export default class extends Entity {
  constructor(container = null) {
    super(container);

    this.opts = {
      attrs : {
        class: 'easywyg-embed'
      }
    };

    this.view = new View();
  }

  get type() {
    return 'embed'
  }
}
