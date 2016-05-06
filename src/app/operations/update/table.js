import Operation from '../../operation.js';
import merge from 'deepmerge';

export default class extends Operation {
  constructor(entity, opts) {
    super();

    this.entity = entity;
    this.opts = opts;
  }

  get type() {
    return 'update'
  }

  // Обновить разметку
  updateMarkup(markup = []) {
    if (markup.length == 0) return;
    this.entity.opts.markup = this.entity.opts.markup.concat(markup);
  }

  // Обновить строки/колонки
  updateData(data) {
    this.entity.opts.data = merge(this.entity.opts.data, data);
  }

  // Обновить указанный entity
  execute(entities) {
    // Обновляем атрибуты
    Object.assign(this.entity.opts.attrs, this.opts.attrs);

    // Обновляем caption
    this.entity.opts.caption = this.opts.caption;

    // Обновляем разметку
    this.updateMarkup(this.opts.markup);

    // Обновляем данные строк/колонок
    this.updateData(this.opts.data);

    this.entity.modified = true;
    return entities.render();
  }
}
