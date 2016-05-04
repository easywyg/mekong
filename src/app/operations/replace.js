import Operation from '../operation.js';

// A Replace Operation
export default class extends Operation {
  constructor(entity, anotherEntity) {
    super();

    this.entity = entity;
    this.anotherEntity = anotherEntity;
  }

  get type() {
    return 'replace'
  }

  // Заменить указанный entity на anotherEntity.
  // В данном случае, anotherEntity не должен быть вставлен в DOM.
  execute(entities) {
    entities.entities[this.entity.index] = this.anotherEntity;
    this.anotherEntity.modified = true;
    this.anotherEntity.index = this.entity.index;

    //this.el.parentNode.replaceChild(otherEntity.view.el, this.el);

    return entities.render();
  }
}
