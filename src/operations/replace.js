import Operation from '../operation';
//import DeleteOperation from './delete';
//import InsertOperation from './insert';

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
  execute() {
    this.entity._container.removeEntity(this.entity);
    this.entity._container.node.replaceChild(
      this.anotherEntity.node, this.entity.node
    );

    return this.anotherEntity;
  }

  rollback() {
    this.anotherEntity.replaceWith(this.entity);
    return null;
  }
}
