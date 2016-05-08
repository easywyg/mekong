import View from '../view';

// A Embed View
export default class extends View {
  build(entity) {
    return this.vnode('div', { attributes: entity.attrs }, []);
  }
}
