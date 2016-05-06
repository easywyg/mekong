import Operation from '../../operation.js';

export default class extends Operation {
  constructor(entity, opts) {
    super();

    this.entity = entity;
    this.opts = opts;
  }

  get type() {
    return 'update';
  }

  // Обновить разметку
  updateMarkup(markup = []) {
    if (markup.length == 0) return;
    this.entity.opts.markup = this.entity.opts.markup.concat(markup);
  }

  // Обновить указанный entity
  execute(entities) {
    // Обновляем атрибуты
    Object.assign(this.entity.opts.attrs, this.opts.attrs);

    // Обновляем caption
    this.entity.opts.caption = this.opts.caption;

    // Обновляем разметку
    this.updateMarkup(this.opts.markup);

    this.entity.modified = true;
    return entities.render();
  }
}
