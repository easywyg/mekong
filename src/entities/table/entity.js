import View   from './view.js';
import Policy from './policies/entity.js';
import Row from './particles/row.js';
import Column from './particles/column.js';
import Caption from './particles/caption.js';

export default function(core) {
  // A Table Entity
  return class extends core.Entity {
    constructor(state) {
      super(state);

      // Entity's default state
      this.state = {
        attrs: {},
        caption: {
          text: 'Caption yay',
          attrs: {},
          markup: []
        },
        head: [
          { text: 'head 1', attrs: {}, markup: [] },
          { text: 'head 2', attrs: {}, markup: [] },
          { text: 'head 3', attrs: {}, markup: [] }
        ],
        body: [
          [
            { text: 'cell 1', attrs: {}, markup: [] },
            { text: 'cell 2', attrs: {}, markup: [] },
            { text: 'cell 3', attrs: {}, markup: [] }
          ],
          [
            { text: 'cell 4', attrs: {}, markup: [] },
            { text: 'cell 5', attrs: {}, markup: [] },
            { text: 'cell 6', attrs: {}, markup: [] }
          ],
        ]
      }

      // Entity's view object
      this.view = new (View(core))(this);

      // Entity's policy object
      this.policy = new (Policy(core))(this);
    }

    addCaption(text, attrs = {}, markup = []) {

    }

    addRow(attrs = {}) {
      let klass = Row(core);
      let sheet = new klass(this.state.sheet, this);

      return sheet.addRow(attrs);
    }

    addHeader(attrs = {}) {

    }

    remove() {
      //this.state.sheet = [];
      this.view.remove();
    }

    get type() {
      return 'table';
    }
  }
}
