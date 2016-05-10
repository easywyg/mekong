import Operation from '../operation';
import DeleteOperation from './delete';

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
  execute(entities) {
    let index = this.entity.index;
    let entityNode = this.entity.node;

    entities.entities[index] = this.anotherEntity;
    this.anotherEntity.modified = true;
    this.anotherEntity.index = index;

    const operation = new DeleteOperation(this.entity);
    operation.execute(entities);
    entities.render();

    return this.anotherEntity;
  }

  reverse(entities) {
    // TODO
  }
}
