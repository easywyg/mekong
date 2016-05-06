import View from '../view.js';
import VdomBuilder from '../segments/vdom_builder';

// A Paragraph View
// Этот класс знает, как рендерить ParagraphEntity
// когда нужно обновлять DOM.
export default class extends View {
  buildMarkup(text, markup) {
    let tagger = new VdomBuilder(text, markup);
    return tagger.process()
  }

  build(entity) {
    let children = this.buildMarkup(entity.text, entity.markup);
    return this.vnode(entity.tag, { attributes: entity.attrs }, children);
  }
}
