import Entity from '../entity.es6';
import View from '../views/container.es6';

// Контейнер. Контейнеру можно задать, какие типы Entity он может содержать.
// Это нужно для того, чтобы в контейнер колонки грида нельзя было добавить другой
// грид, например. Хотя мля, почему бы и нет?
// Контейнер должен представлять собой элемент, который тоже можно отрендерить.
export default class extends Entity {
  constructor(container = null) {
    super(container);

    this.opts = {
      tag    : 'div',
      attrs  : {}
    };

    this.view = new View();
  }

  appendChild(node) {
    return this.appendedNode.appendChild(node);
  }

  get tag() {
    return this.opts.tag
  }
}
