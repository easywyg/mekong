import DeleteOperation   from './operations/delete.js';
import MoveOperation     from './operations/move.js';
import ReplaceOperation  from './operations/replace.js';
import TransferOperation from './operations/transfer.js';
import UpdateOperation   from './operations/update.js';

const OperationMap = {
  Delete   : DeleteOperation,
  Move     : MoveOperation,
  Replace  : ReplaceOperation,
  Transfer : TransferOperation,
  Update   : UpdateOperation
};

export default class {
  constructor(options) {
    this.modified = false;
    this._id = this.generateId();
    this._container = null;
    this._options = {};
    this._representation = {};
    this._siblings = {
      prev: null,
      next: null
    }

    this.options = options;
  }

  defaultOptions() {
    return {};
  }

  prev() {
    return this._container.prev(this);
  }

  next() {
    return this._container.next(this);
  }

  get type() {
    return null;
  }

  get view() {
    return null;
  }

  get policy() {
    return null;
  }

  get container() {
    return this._container;
  }

  get options() {
    return this._options;
  }

  set container(container) {
    this._container = container;
  }

  set options(opts) {
    this.modified = true;
    this._options = Object.assign(this.defaultOptions, opts);
  }

  generateId() {
    return Math.random().toString(36).slice(2);
  }

  clone() {
    return Object.assign(Object.create(this), this);
  }

  cloneOptions() {
    return Object.assign({}, this.options);
  }

  appendEntity(entity) {
    if (this.policy.canAppend()) {
      entity.render();
      return this.operate('Transfer', entity, this);
    }

    return null;
  }

  replaceWith(entity) {
    return this.operate('Replace', this, entity);
  }

  delete() {
    return this.operate('Delete', this);
  }

  update(opts) {
    return this.operate('Update', this, opts);
  }

  moveBefore(entity) {
    return this.operate('Move', this, entity);
  }

  operate(operationName, ...args) {
    const operation = new OperationMap[operationName](...args);
    const result = operation.execute();

    return {
      // Result of operation
      result: result,

      // Rollback operation
      rollback: () => { operation.rollback() },

      // Reference to executed operation
      operation: operation,

      // TODO: Add operation status (true if successful, otherwise false)
      status: null // operation.status()
    };
  }

  render() {
    if (this.modified == true) {
      this.node = this.view.render();
      this.modified = false;
    }

    return null;
  }
}
