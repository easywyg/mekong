import Entity from '../entity.js';
import View from '../views/paragraph.js';

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