import Operation from '../operation';

export default class extends Operation {
  // Принимает инстанс сущности и опции
  constructor(entity, options) {
    super();

    this.entity = entity;
    this.options = options;
    this._rollback = {};
  }

  get type() {
    return 'update'
  }

  // Обновить указанный entity
  execute() {
    // Keep entity opts for rollback()
    this._rollback.options = this.entity.cloneOptions();
    this.entity.options = this.options;
    this.entity.render();

    return this.entity;
  }

  rollback() {
    this.entity.options = this._rollback.options;
    this.entity.render();

    return null;
  }
}
