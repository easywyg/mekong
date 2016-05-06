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
    this.entity.modified = true;
    return entities.render();
  }
}
