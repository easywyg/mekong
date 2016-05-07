import View from '../view.js';

// A Embed View
export default class extends View {
  build(entity) {
    return this.vnode('div', { attributes: entity.attrs }, []);
  }
}
