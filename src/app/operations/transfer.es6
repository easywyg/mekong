import Operation from '../operation.es6';

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
    if (this.entity.type == 'root_container') {
      this.entity.sync(this.container);
    } else {
      //console.log(this.container, this.entity)
      this.entity.sync(this.container.appendChild(this.entity.view.el));
    }

    return entities.render();
  }
}
