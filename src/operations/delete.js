import Operation from '../operation';
import InsertOperation from '../operations/insert';

// A Delete Operation
export default class extends Operation {
  constructor(entity) {
    super();

    this.entity = entity;
  }

  get type() {
    return 'delete'
  }

  // Удалить указанный entity
  execute(entities) {
    if (this.reversible) {
      this.deletedEntity = Object.assign(this.entity, {}); // Clone
    }

    entities.delete(this.entity);
    this.entity.delete();

    return null;
  }

  reverse(entities) {
    // Если операция помечена как неоткатываемая, выходим
    if (!this.reversible) {
      return false;
    }

    const operation = new InsertOperation(
      entityName, this.deletedEntity.opts, this.deletedEntity.container
    );

    return operation.execute(entities);
  }
}
