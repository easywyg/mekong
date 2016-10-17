import View from '../view';
import VdomBuilder from '../segments/vdom_builder';

// A Table Cell View
export default class extends View {
  buildMarkup(text, markup) {
    let tagger = new VdomBuilder(text, markup);
    return tagger.process()
  }

  build(entity) {
    let cell = this.vnode(entity.opts.tag, { attributes: entity.opts.attrs },
      this.buildMarkup(entity.opts.text, entity.opts.markup)
    );

    return cell;
  }
}

