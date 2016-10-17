import Entity from '../entity';
import View from '../views/embed';

// A Embed Entity
export default class extends Entity {
  constructor(container = null) {
    super(container);

    this.opts = {
      attrs : {}
    };

    this.view = new View();
  }

  get type() {
    return 'embed'
  }
}
