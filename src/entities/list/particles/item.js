//import Particle from '../particle';

// TODO
// дефолтный representation для сущности
// можно хранить в отдельном файле. Сама сущность хранится в отдельной дире
// со всеми зависимости. Есть файл export.js, в котором экспортируется сущность и все ее
// зависимости.

export default function(core) {
  return class extends core.Particle {
    constructor(items) {
      super();

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
}
