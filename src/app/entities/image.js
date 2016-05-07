import Entity from '../entity.js';
import View from '../views/image.js';
import {updateText} from './lib/utils';

// A Image Entity
export default class extends Entity {
  constructor(container = null) {
    super(container);

    this.opts = {
      caption : '',
      attrs   : {
        figure: {
          class: 'easywyg-figure'
        },
        img: {},
        figcaption: {},
        a: {}
      },
      markup: []
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

    // Обновляем caption
    this.opts.caption = updateText(
      this.opts.caption,
      opts.caption,
      opts.start,
      opts.end
    )

    // Обновляем разметку
    this.updateMarkup(opts.markup);
  }

  get type() {
    return 'image'
  }

  get caption() {
    return this.opts.caption
  }

  get markup() {
    return this.opts.markup
  }
}
