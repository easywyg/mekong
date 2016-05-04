import View from '../view.js';

// A Paragraph View
// Этот класс знает, как рендерить ParagraphEntity
// когда нужно обновлять DOM.
export default class extends View {
  build(entity) {
    return this.vnode(entity.tag, {}, [
      this.vtext(entity.text)
    ])
  }
}
