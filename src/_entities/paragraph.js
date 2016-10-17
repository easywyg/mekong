import Entity from '../entity';
import View from '../views/paragraph';
import Policy from '../policies/paragraph';

// A Paragraph Entity
export default class extends Entity {
  addRepresentation() {
    this._representation = {
      tag: 'p',
      text: '',
      attrs: {},
      markup: []
    };
  }

  updateText(text) {

  }

  updateTax(tag) {

  }

  updateMarkup(markup) {

  }

  updateAttrs(attrs) {

  }

  get defaultOptions() {
    return {
      tag    : 'p',
      text   : '',
      attrs  : {},
      markup : []
    }
  }

  get view() {
    return new View(this);
  }

  get policy() {
    return new Policy(this);
  }

  get type() {
    return 'paragraph'
  }
}
