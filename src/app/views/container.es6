import View from '../view.es6';

// A Container View
export default class extends View {
  build(entity) {
    return this.vnode(entity.tag, { attributes: entity.attrs });
  }
}
