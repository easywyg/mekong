import View from '../view.es6';

// A Image View
export default class extends View {
  build(entity) {
    let img = this.vnode('img', { attributes: entity.attrs.img });

    if (entity.attrs.a.href) {
      img = this.vnode('a', { attributes: entity.attrs.a }, [img]);
    }

    const caption = this.vnode('figcaption', { attributes: entity.attrs.figcaption }, [
      this.vtext(entity.caption)
    ]);

    return this.vnode('figure', { attributes: { class: 'fuckyaz' } }, [img, caption])
  }
}
