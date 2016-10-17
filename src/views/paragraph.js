import View from '../view';
import VdomBuilder from '../segments/vdom_builder';

// A Paragraph View
// Этот класс знает, как рендерить ParagraphEntity
// когда нужно обновлять DOM.
export default class extends View {
  buildMarkup(text, markup) {
    let tagger = new VdomBuilder(text, markup);
    return tagger.process()
  }

  build() {
    let children = this.buildMarkup(this.entity.options.text, this.entity.options.markup);
    return this.vnode(this.entity.options.tag, { attributes: this.entity.options.attrs }, children);
  }
}
