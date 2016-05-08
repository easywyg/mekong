import View from '../view';
import VdomBuilder from '../segments/vdom_builder';

// A Image View
export default class extends View {
  buildMarkup(caption, markup) {
    let tagger = new VdomBuilder(caption, markup);
    return tagger.process()
  }

  build(entity) {
    let img = this.vnode('img', { attributes: entity.attrs.img });

    if (entity.attrs.a.href) {
      img = this.vnode('a', { attributes: entity.attrs.a }, [img]);
    }

    const caption = this.vnode('figcaption', { attributes: entity.attrs.figcaption },
      this.buildMarkup(entity.caption, entity.markup)
    );

    return this.vnode('figure', { attributes: entity.attrs.figure }, [img, caption])
  }
}
