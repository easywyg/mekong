import View from '../view';
import VdomBuilder from '../segments/vdom_builder';

// ListItem view
export default class extends View {
  buildMarkup(text, markup) {
    let tagger = new VdomBuilder(text, markup);
    return tagger.process();
  }

  build() {
    let children = this.buildMarkup(this.entity.options.text, this.entity.options.markup);
    return this.vnode('li', { attributes: this.entity.options.attrs }, children);
  }
}
