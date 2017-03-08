import RemoveOperation   from './operations/remove.js';
import MoveOperation     from './operations/move.js';
import ReplaceOperation  from './operations/replace.js';
import UpdateOperation   from './operations/update.js';

const OperationMap = {
  Remove   : RemoveOperation,
  Move     : MoveOperation,
  Replace  : ReplaceOperation,
  Update   : UpdateOperation
};

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

  clone() {
    return Object.assign(Object.create(this), this);
  }

  // Replace Entity with another `entity`
  replace(entity) {
    return this.operate('Replace', entity);
  }

  // Update Entity state with newState
  update(newState) {
    return this.operate('Update', newState)
  }

  // Move Entity before another `entity`
  move(entity) {
    return this.operate('Move', entity);
  }

  // Remove Entity from DOM
  // This is common method for all Entities.
  remove() {
    //return this.operate('Remove', {})
  }

  operate(operationName, newState) {
    const operation = new OperationMap[operationName](this, newState);
    const result = operation.execute();

    // OperationResult object
    return {
      // Result of operation
      result: result,

      // Rollback operation
      rollback: () => { operation.rollback() },

      // Reference to executed operation
      operation: operation,

      // TODO: Add operation status (true if successful, otherwise false)
      success: operation.status // operation.status()
    };
  }

  // Render Entity
  render() {
    this.view.render();
    return null;
  }
}
