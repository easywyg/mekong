import View   from './view.js';
import Policy from './policies/entity.js';
import Item from './particles/item.js';

export default function(core) {
  // A List Entity
  return class extends core.Entity {
    static type = 'list'
    static defaultState = {
      tag   : 'ul',
      attrs : {},
      items : []
    }

    get view() {
      return new (View(core))
    }

    get policy() {
      return new (Policy(core))(this)
    }

    // Add list item
    createItem() {
      const klass = Item(core);
      const item = new klass(this.state.items, this);

      return item.createItem();
    }
  }
}
