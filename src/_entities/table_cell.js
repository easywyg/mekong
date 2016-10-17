import Entity from '../entity';
import View from '../views/table_cell';
import merge from 'deepmerge';
import {updateText} from './lib/utils';

// A Table Cell Entity
export default class extends Entity {
  constructor(container = null) {
    super(container);

    this.opts = {
      tag    : 'td',
      text   : '',
      attrs  : {},
      markup : []
    };

    this.view = new View();
  }

  // Обновить разметку
  updateMarkup(markup = []) {
    if (markup.length == 0) return;
    this.opts.markup = this.opts.markup.concat(markup);
  }

  set options(opts) {
    this.modified = true;

    // Обновляем атрибуты
    Object.assign(this.opts.attrs, opts.attrs);

    // Обновляем text
    this.opts.text = updateText(
      this.opts.text,
      opts.text,
      opts.start,
      opts.end
    )

    // Обновляем разметку
    this.updateMarkup(opts.markup);
  }

  get type() {
    return 'table_cell'
  }

  get markup() {
    return this.opts.markup
  }
}

