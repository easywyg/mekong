import Entity from '../entity';
import View from '../views/table';
import Policy from '../policies/table';
import merge from 'deepmerge';
import {updateText} from './lib/utils';

// A Table Entity
export default class extends Entity {
  constructor(options) {
    super(options);

    this._options = {
      caption : '',
      attrs   : {
        table : {},
        caption : {}
      },
      markup: []
    };

    this.options = options;
  }

  // Обновить разметку
  updateMarkup(markup = []) {
    if (markup.length == 0) return;
    this.options.markup = this.options.markup.concat(markup);
  }

  set options(opts) {
    this.modified = true;

    // Обновляем атрибуты
    this._options.attrs = Object.assign(this._options.attrs, options.attrs);

    // Обновляем caption
    this._options.caption = updateText(
      this._options.caption,
      opts.caption,
      opts.start,
      opts.end
    )
  }

  get options() {
    return this._options;
  }

  get view() {
    return new View(this);
  }

  get policy() {
    return new Policy(this);
  }

  get type() {
    return 'table'
  }

  /*get markup() {
    return this.options.markup
  }*/
}

