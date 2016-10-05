import Operation from '../operation';
import InsertOperation from '../operations/insert';
import ReplaceOperation from '../operations/replace';

export default class extends Operation {
  // Принимает инстанс сущности и опции
  constructor(entity, opts) {
    super();

    this.entity = entity;
    this.opts = opts;
    this._rollback = {};
  }

  get type() {
    return 'update'
  }

  // Обновить указанный entity
  execute(entities) {
    // Keep entity opts for rollback()
    this._rollback = {
      opts: Object.assign({}, this.entity.opts),
      entity: this.entity
    };

    this.entity.options = this.opts;
    entities.render();

    return this.entity;
  }

  rollback(entities) {
    const insertOperation = new InsertOperation(
      this._rollback.entity.name,
      this._rollback.opts,
      this.entity.container
    );

    const insertedEntity = insertOperation.execute(entities);
    const replaceOperation = new ReplaceOperation(
      this.entity, insertedEntity
    );

    replaceOperation.execute(entities);

    return null;
  }
}
