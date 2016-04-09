import Operation from '../operation.es6';

// A Update Operation
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
    this.entity.opts.merge(this.opts);
    this.entity.modified = true;

    return entities.render();
  }
}
