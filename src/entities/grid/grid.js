import View   from './view.js';
import Policy from './policies/grid.js';
import Column from './column.js';

export default function(core) {
  // A Grid Entity
  return class extends core.Lib.Mix(core.Entity).with(core.Mixin.AttrMethods) {
    static type = 'grid'
    static defaultState = {
      tag   : 'div',
      attrs : { class: 'grid' },

      // Columns collection
      columns : []
    }

    get view() {
      return new (View(core))
    }

    get policy() {
      return new (Policy(core))(this)
    }

    // Add column
    createColumn(attrs) {
      const klass = Column(core);
      const item = new klass({}, this);
      return item.createColumn(attrs);
    }
  }
}
