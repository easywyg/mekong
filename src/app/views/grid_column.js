import View from '../view.js';

// A Grid Column View
export default class extends View {
  build(entity) {
    return this.vnode('div', { attributes: entity.opts.attrs }, []);
  }
}
