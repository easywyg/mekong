import {diff, patch, create} from 'virtual-dom';
import {VNode, VText} from 'virtual-dom';
import VdomBuilder from './segments/vdom_builder';

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

  remove(entity) {
    this.el.parentNode.removeChild(this.el);
  }

  // Обрамить разметкой `markup` текст `text`.
  // Возвращает массив виртуальных нод.
  buildMarkup(text, markup) {
    let tagger = new VdomBuilder(text, markup);
    return tagger.process()
  }

  // TODO: Метод patch работает не так, как мне нужно.
  // В сложных случаях, когда пересекается разметка, он работает неправильно.
  // Видимо, нужно будет написать свою реализацию виртуального дома. А пока обойдемся без него.
  render() {
    const newVNode = this.build(this.entity.state);

    if (newVNode === null) {
      return null;
    }

    // Обновляем вставленную ноду (patch)
    if (this.el) {
      this.vel = diff(this.vel, newVNode);
      this.el = patch(this.el, this.vel);
      this.entity.node = this.el;
    }
    // Вставляем ноду впервые
    else {
      this.vel = newVNode;
      this.el = create(this.vel, { document: this.entity.root.ownerDocument });
      this.entity.root.appendChild(this.el);
    }

    return null
  }
}
