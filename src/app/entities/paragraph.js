import Entity from '../entity.js';
import View from '../views/paragraph.js';
import {updateText} from './lib/utils';

// A Paragraph Entity
// Note: Что делает этот класс? По-идее, он просто хранит в себе переданные
// в него данные, и имеет надор методов для модификации этих данных.
export default class extends Entity {
  constructor(container = null) {
    super(container);

    this.opts = {
      tag    : 'p',
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

  // Обновить тег или атрибуты тега
  updateTag(tagName, attrs = {}) {
    Object.assign(this.opts.attrs, attrs);

    if (typeof tagName != 'undefined' && tagName.length > 0) {
      this.tag = tagName;
    }
  }

  set options(opts) {
    this.modified = true;
    //Object.assign(opts, this.opts);

    // Обновляем текст
    this.opts.text = updateText(
      this.opts.text,
      opts.text,
      opts.start,
      opts.end
    )

    // Обновляем разметку
    this.updateMarkup(opts.markup);

    // Обновляем тег
    this.updateTag(opts.tag, opts.attrs);
  }

  get type() {
    return 'paragraph'
  }

  get text() {
    return this.opts.text
  }

  get markup() {
    return this.opts.markup
  }

  get tag() {
    return this.opts.tag
  }

  set tag(tagName) {
    return this.opts.tag = tagName
  }
}
