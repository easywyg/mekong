import Operation from '../operation';
import InsertOperation from '../operations/insert';

// A Delete Operation
export default class extends Operation {
  constructor(entity) {
    super();

    this.entity = entity;
    this._rollback = {};
  }

  get type() {
    return 'delete'
  }

  // Удалить указанный entity
  execute(entities) {
    this._rollback.entity = Object.assign(this.entity, {}); // Clone

    entities.delete(this.entity);
    this.entity.delete();

    return this._rollback.entity;
  }

  rollback(entities) {
    const operation = new InsertOperation(
      this._rollback.entity.name,
      this._rollback.entity.opts,
      this._rollback.entity.container
    );

    operation.execute(entities);

    return null;
  }
}
