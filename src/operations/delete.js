import Operation from '../operation';

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
  execute() {
    this._rollback = {
      entity: this.entity.clone()
    }

    this.entity.node.parentNode.removeChild(this.entity.node);
    this.entity.container.removeEntity(this.entity);

    return this._rollback.entity;
  }

  rollback() {
    this._rollback.entity.container.appendEntity(this._rollback.entity);

    const prevEntity = this._rollback.entity.prev()
    if (prevEntity) {
      this._rollback.entity.moveBefore(prevEntity);
    }

    return null;
  }
}
