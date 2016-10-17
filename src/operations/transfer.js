import Operation from '../operation';

// A Transfer Operation
// Put entity to container
export default class extends Operation {
  constructor(entity, container) {
    super();

    this.entity = entity;
    this.container = container;
    this._rollback = {};
  }

  get type() {
    return 'transfer'
  }

  execute() {
    if (!this.container.node || !this.entity.node) {
      return null;
    }

    this._rollback.prevContainer = this.entity.container;
    this.container.node.appendChild(this.entity.node);
    this.entity.container = this.container;
    this.entity.node._entity = this.entity;

    return null;
  }

  rollback() {
    if (this._rollback.prevContainer) {
      this._rollback.prevContainer.appendEntity(this.entity);
    }

    return null;
  }
}
