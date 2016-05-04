import Entity from './entity.js';

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
  }

  appendChild(node) {
    return this.node.appendChild(node);
  }

  get tag() {
    return this.opts.tag
  }
}
