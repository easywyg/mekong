import Operation from '../operation';

export default class extends Operation {
  // Принимает инстанс сущности и опции
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
    this.entity.options = this.opts;
    return entities.render();
  }
}
