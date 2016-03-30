//import Container from './container.es6';

// Entity abstract class
// Note: this class cannot be instantiated directly
export default class {
  constructor(container = null) {
    this.container = container;// || new Container(document.body);
    this.appendedNode = null;
    this.modified = false;
    this.opts = {
      attrs: {}
    };
  }

  // Указываем ссылку на элемент, вставленный в DOM
  sync(appendedNode) {
    if (appendedNode) {
      this.appendedNode = appendedNode;
      this.appendedNode.easywygEntity = this;
    } else {
      delete this.appendedNode.easywygEntity;
      delete this.appendedNode;
    }

    this.modified = false;
  }

  isSynced() {
    return this.appendedNode != null
  }

  get attrs() {
    return this.opts.attrs
  }

  update(opts) {
    this.opts = this.merge(this.opts, opts);
    this.modified = true;

    return this;
  }

  // Переместить в указанный контейнер (переместит в конец).
  // NOTE: Похоже что сам entity не должен уметь перемещать или удалять себя.
  // Эти методы должны быть внутри соотв. команд, ибо только команда должна что-то делать подобное.
  transfer(container) {
    this.container = container;
    this.view.transfer(this, container);
    return this;
  }

  delete() { // ???
    this.view.delete(this);
    return this;
  }

  replace() {
    this.view.replace(this);
    return this;
  }

  select() {

  }

  // Entity должно уметь рендерить себя
  // Этот метод должен вызывать метод render() у соответствующего View
  // Рендерим только тогда, когда modified == true
  render() {
    if (this.modified == true) {
      this.modified = false;
      return this.view.render(this);
    } else {
      return null;
    }
  }

  merge(dest, source) {
    for (var prop in source) {
      dest[prop] = source[prop];
    }

    return dest;
  }
}
