import Operation from '../operation';

// A Transfer Operation
export default class extends Operation {
  constructor(entity, container) {
    super();

    this.entity = entity;
    this.container = container;
  }

  get type() {
    return 'transfer'
  }

  execute(entities) {
    this.entity.container = this.container;

    if (this.entity.type == 'root_container') {
      this.entity.sync(this.container);
    } else {
      // Вставляем в контейнер типа Container
      if (typeof this.container.type != 'undefined') {
        this.entity.sync(this.container.append(this.entity.view.el));
      }
      // Вставляем в контейнер типа HTMLElement
      else {
        this.entity.sync(this.container.appendChild(this.entity.view.el));
      }
    }

    return entities.render();
  }

  rollback(entities) {
    // TODO
    return null;
  }
}
