import Operation from '../../operation.js';

export default class extends Operation {
  constructor(entity, opts) {
    super();

    this.entity = entity;
    this.opts = opts;
  }

  get type() {
    return 'update'
  }

  // Обновить указанный entity
  execute(entities) {
    // Обновляем опции
    Object.assign(this.entity.opts, this.opts);

    this.entity.modified = true;
    return entities.render();
  }
}
