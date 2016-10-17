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

  delete(entity) {
    this.el.parentNode.removeChild(this.el);
  }

  // TODO: Нужно пока не использовать vdom, так как метод patch работает не так, как мне нужно.
  // В сложных случаях, когда пересекается разметка, он работает неправильно.
  // Видимо, нужно будет написать свою реализацию виртуального дома. А пока обойдемся без него.
  render(entity) {
    this.vel = this.build(entity);

    // Обновляем вставленную ноду
    if (entity.isSynced()) {
      const newEl = create(this.vel, { document: document });

      this.el.parentNode.replaceChild(newEl, this.el);
      this.el = newEl;
    }
    // Вставляем ноду впервые
    // На самом деле тут она просто создается, а втавляется в Entities.
    else {
      this.el = create(this.vel, { document: document });
    }

    // Обновляем ссылку на элемент DOM
    entity.sync(this.el);

    return this.el;
    /*
    console.log(entity)
    // Обновляем вставленную ноду
    if (entity.isSynced()) {
      let newVNode = this.build(entity);
      //console.log(this.vel)
      this.el = patch(this.el, diff(this.vel, newVNode));
      this.vel = newVNode;
    }
    // Вставляем ноду впервые
    // На самом деле тут она просто создается, а втавляется в Entities.
    else {
      this.vel = this.build(entity);
      this.el = create(this.vel, { document: document });
    }

    // Обновляем ссылку на элемент DOM
    entity.sync(this.el);

    return this.el;*/
  }
}
