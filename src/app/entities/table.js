import Entity from '../entity.js';
import View from '../views/table.js';

// A Table Entity
export default class extends Entity {
  constructor(container = null) {
    super(container);

    this.opts = {
      caption : '',
      attrs   : {
        table: {
          class: 'easywyg-table'
        },
        caption: {},
      },
      markup: [],
      data: []
    };

    this.view = new View();
  }

  get type() {
    return 'table'
  }

  get markup() {
    return this.opts.markup
  }
}
