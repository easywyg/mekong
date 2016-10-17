import Entity from '../entity';
import View from '../views/list_item';
import Policy from '../policies/list_item';

// A ListItem Entity
export default class extends Entity {
  constructor(options) {
    super(options);

    this._options = {
      attrs: {},
      text: null,
      markup: []
    };

    this.options = options;
  }

  get view() {
    return new View(this);
  }

  get policy() {
    return new Policy(this);
  }

  get type() {
    return 'list_item';
  }
}
