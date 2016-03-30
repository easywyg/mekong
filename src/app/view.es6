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

  transfer(entity, container) {
    entity.sync(container.appendChild(this.el));
    return entity.appendedNode;
  }

  delete(entity) {
    entity.sync(undefined);
    this.el.parentNode.removeChild(this.el);
  }

  replace(entity, otherEntity) {
    this.el.parentNode.replaceChild(otherEntity.view.el, this.el);
  }

  render(entity) {
    // Обновляем вставленную ноду
    if (entity.isSynced()) {
      let newVNode = this.build(entity);
      this.el = patch(this.el, diff(this.vel, newVNode));
      this.vel = newVNode;

      // Обновляем ссылку на элемент DOM
      entity.sync(this.el);
    }
    // Вставляем ноду впервые
    // На самом деле тут она просто создается, а втавляется в Entities.
    else {
      this.vel = this.build(entity);
      this.el = create(this.vel);

      // Entity рендерит себя сам внутрь контейнера
      let insertedNode = entity.container.appendChild(this.el);
      entity.sync(insertedNode);
    }

    return this.el;
  }
}
