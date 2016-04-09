import {diff, patch, create} from 'virtual-dom';
import {VNode, VText} from 'virtual-dom';

// View abstract class
// Note: this class cannot be instantiated directly
export default class {
  constructor() {
    this.el  = null; // Element
    this.vel = null; // Virtual element
  }

  vnode(...args) {
    return new VNode(...args);
  }

  vtext(...args) {
    return new VText(...args);
  }

  render(entity) {
    if (entity.deleted) {
      entity.sync(undefined);
      this.el.parentNode.removeChild(this.el);
      return null;
    }

    // Обновляем вставленную ноду
    if (entity.isSynced()) {
      let newVNode = this.build(entity);
      this.el = patch(this.el, diff(this.vel, newVNode));
      this.vel = newVNode;
    }
    // Вставляем ноду впервые
    // На самом деле тут она просто создается, а втавляется в Entities.
    else {
      this.vel = this.build(entity);
      this.el = create(this.vel);
    }

    // Обновляем ссылку на элемент DOM
    entity.sync(this.el);

    return this.el;
  }
}
