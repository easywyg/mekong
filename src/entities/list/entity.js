import View   from './view.js';
import Policy from './policies/entity.js';
import Item from './particles/item.js';

export default function(core) {
  //console.log('List Entity', core.Entity);

  // A List Entity
  return class extends core.Entity {
    constructor(x) {
      super(x);

      console.log('VIEW', this.view)

      // Inner representation of entity
      this._representation = {
        tag: 'ul',
        attrs: {},
        items: []
      };
    }

    // Этот метод устанавливает данные представления и рендерит сущность целиком
    setRepresentation(representation) {
      // В процессе вызова разных методов мы меняем эти данные. Их потом отдаем в View
      // и рендерим.
      this._representation = representation;
      this.modified = true;
      this.render();
    }

    // Эти методы меняют данные в представлении
    addItem(text, attrs = {}, markup = []) {
      const klass = Item(core);
      const item = new klass(this._representation.items);
      const newItem = item.addItem(text, attrs, markup);

      //console.log( this._representation);
      // re-render
      this.modified = true;
      this.render();

      return new klass(newItem.items);
    }

    get defaultOptions() {
      return {
        tag    : 'ul',
        attrs  : {}
      }
    }

    get view() {
      const klass = View(core);
      return new klass(this);
    }

    get policy() {
      const klass = Policy(core);
      return new klass(this);
    }

    get type() {
      return 'list';
    }
  }
}
