import View from '../view';

// A Substrate View
export default class extends View {
  build(entity) {
    return this.vnode(entity.tag, { attributes: entity.attrs });
  }
}
