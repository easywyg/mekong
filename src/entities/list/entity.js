import View   from './view.js';
import Policy from './policies/entity.js';
import Item from './particles/item.js';

/*
  Example:

  var Mekong = require('mekong').default;
  var mekong = new Mekong(document.getElementById('body'));

  mekong.useEntity('Root');
  mekong.useEntity('List');
  mekong.useEntity({ Image: function(core) {} });

  // A List
  var list = mekong.entity('List', { tag: 'ol' });
  var item1 = list.addItem('item 1');

  var item1_1 = item1.addItem('item 1.1');
  var item2 = list.addItem('item 2');
  var item1_2 = item1.addItem('item 1.2');
  var item1_3 = item1.addItem('item 1.3');

  console.log('x',item1)
  item1.update('lol');
  item1_3.remove();
*/


export default function(core) {
  // A List Entity
  return class extends core.Entity {
    constructor(root, options) {
      super(root, options);
      let self = this;

      this.state = new Proxy(Object.assign({
        tag   : 'ul',
        attrs : {},
        items : []
      }, options || {}), {
        set(target, key, value) {
          console.log(`XSetting value ${key} as ${value}`)
          target[key] = value;

          self.render()

          return true
        },
        deleteProperty(target, key) {
          console.log(`Deleting ${key}`)
          delete target[key];
          self.render()
        }
      });

      // Entity's view object
      this.view = new (View(core))(this);

      // Entity's policy object
      this.policy = new (Policy(core))(this);
    }

    // Add list item
    addItem(state) {
      const klass = Item(core);
      const item = new klass(this.state.items, this);

      return item.addItem(state);
    }

    // Remove list
    remove() {
      this.state.items = [];
      this.view.remove();
    }

    get type() {
      return 'list';
    }
  }
}
