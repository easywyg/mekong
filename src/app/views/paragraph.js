import View from '../view.js';
import Tagger from '../tagger.js';

// A Paragraph View
// Этот класс знает, как рендерить ParagraphEntity
// когда нужно обновлять DOM.
export default class extends View {
  buildMarkup(text, markup) {
    //console.log(text, markup);
    let tagger = new Tagger(text, markup);
    return tagger.process()
  }

  build(entity) {
    let children = this.buildMarkup(entity.text, entity.markup);

    //console.log(children);
    return this.vnode(entity.tag, entity.attrs, children);
  }
}
