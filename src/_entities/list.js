import Entity from '../entity';
import Particle from '../particle';
import View from '../views/list';
import Policy from '../policies/list';

// TODO
// дефолтный representation для сущности
// можно хранить в отдельном файле. Сама сущность хранится в отдельной дире
// со всеми зависимости. Есть файл export.js, в котором экспортируется сущность и все ее
// зависимости.

class Item extends Particle {
  constructor(items) {
    this.items = items;
  }

  addItem(text, attrs, markup) {
    const newItem = {
      text: text,
      attrs: attrs,
      markup: markup,
      items: []
    };

    this.items.push(newItem);
    return newItem;
  }

  update(text, attrs = {}, markup = []) {
    return null; // TODO
  }
}

// A List Entity
export default class extends Entity {
  constructor(o) {
    super(o);

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
    const item = new Item(this._representation.items);
    const newItem = item.addItem(text, attrs, markup);

    //console.log( this._representation);
    // re-render
    this.modified = true;
    this.render();

    return new Item(newItem.items);
  }

  get defaultOptions() {
    return {
      tag    : 'ul',
      attrs  : {}
    }
  }

  get view() {
    return new View(this);
  }

  get policy() {
    return new Policy(this);
  }

  get type() {
    return 'list';
  }
}
