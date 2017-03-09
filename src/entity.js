// Entity base class
export default class {
  constructor(root, options) {
    this.root = root;
    this._id = this.generateId();
    this._container = null;
    this.state = {};

    this._siblings = {
      prev: null,
      next: null
    }
  }

  get type() {
    throw new Error('Should be implemented')
  }

  prev() {
    return this._container.prev(this);
  }

  next() {
    return this._container.next(this);
  }

  get container() {
    return this._container;
  }

  set container(container) {
    this._container = container;
  }

  generateId() {
    return Math.random().toString(36).slice(2);
  }
}
