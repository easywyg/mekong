import Entity from '../entity';
import View from '../views/list';

// A List Entity
export default class extends Entity {
  constructor(container = null) {
    super(container);

    this.opts = {
      tag: 'ul',
      attrs: {},
      data: [
        {
          text: 'Hello 2',
          markup: [],
          attrs: {},
          items: [
            {
              text: 'yay',
              markup: [],
              attrs: {}
            },
            {
              text: 'lol',
              markup: [],
              attrs: {}
            },
          ]
        },
      ]
    };

    this.view = new View();
  }

  get type() {
    return 'list'
  }
}
