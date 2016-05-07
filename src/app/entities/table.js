import Entity from '../entity.js';
import View from '../views/table.js';
import merge from 'deepmerge';
import {updateText} from './lib/utils';

// A Table Entity
export default class extends Entity {
  constructor(container = null) {
    super(container);

    this.opts = {
      caption : '',
      attrs   : {
        table: {
          class: 'easywyg-table'
        },
        caption: {},
      },
      markup: [],
      data: []
    };

    this.view = new View();
  }

  // Обновить разметку
  updateMarkup(markup = []) {
    if (markup.length == 0) return;
    this.opts.markup = this.opts.markup.concat(markup);
  }

  // Обновить строки/колонки
  updateData(data) {
    if (typeof data == 'undefined') return;
    this.opts.data = merge(this.opts.data, data);
  }

  set options(opts) {
    this.modified = true;

    // Обновляем атрибуты
    Object.assign(this.opts.attrs, opts.attrs);

    // Обновляем caption
    this.opts.caption = updateText(
      this.opts.caption,
      opts.caption,
      opts.start,
      opts.end
    )

    // Обновляем разметку
    this.updateMarkup(opts.markup);

    // Обновляем данные строк/колонок
    this.updateData(opts.data);
  }

  get type() {
    return 'table'
  }

  get markup() {
    return this.opts.markup
  }
}
