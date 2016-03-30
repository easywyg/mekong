import Operation from '../operation.es6';

// A Update Operation
export default class extends Operation {
  constructor(entity, opts) {
    super();

    this.entity = entity;
    this.opts = opts;
  }

  execute(entities) {
    const result = this.entity.update(this.opts);
    entities.render();

    return result;
  }
}
