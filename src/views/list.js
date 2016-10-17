import View from '../view';

// List view
export default class extends View {
  build() {
    const r = this.entity._representation;

    // TODO: Надо рекурсивно построить виртуальный дом на основе представления
    return this.vnode(r.tag, { attributes: r.attrs }, []);
  }
}
