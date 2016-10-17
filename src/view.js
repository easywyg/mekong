import {diff, patch, create} from 'virtual-dom';
import {VNode, VText} from 'virtual-dom';

// View abstract class
// Note: this class cannot be instantiated directly
export default class {
  constructor(entity) {
    this.entity = entity;
    this.el  = null; // Element
    this.vel = null; // Virtual element
  }

  vnode(...args) {
    return new VNode(...args);
  }

  vtext(...args) {
    return new VText(...args);
  }

  delete(entity) {
    this.el.parentNode.removeChild(this.el);
  }

  // TODO: Метод patch работает не так, как мне нужно.
  // В сложных случаях, когда пересекается разметка, он работает неправильно.
  // Видимо, нужно будет написать свою реализацию виртуального дома. А пока обойдемся без него.
  render() {
    this.vel = this.build();

    // Обновляем вставленную ноду
    if (this.entity.node != null) {
      this.el = create(this.vel, { document: document });
      this.entity.node.parentNode.replaceChild(this.el, this.entity.node);
    }
    // Вставляем ноду впервые
    // На самом деле тут она просто создается, а втавляется в Entities.
    else {
      this.el = create(this.vel, { document: document });
    }

    return this.el;
  }
}
