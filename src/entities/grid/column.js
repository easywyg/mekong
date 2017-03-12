// Commands
import InsertColumnCommand from './commands/column/insert.js';
import RemoveColumnCommand from './commands/column/remove.js';

import Policy from './policies/column.js';

export default function(core) {
  return class extends core.Lib.Mix(core.Entity).with(core.Mixin.AttrMethods) {
    static type = 'grid_column'
    static defaultState = {
      tag: 'div',
      attrs: {}
    }

    constructor(state, entity) {
      super(state);
      this.entity = entity;
    }

    get policy() {
      return new (Policy(core))(this)
    }

    // TODO: При создании колонки должен перерендериваться весь entity
    // с учетом добавленных колонок
    createColumn(attrs) {
      this.entity.runCommand(new InsertColumnCommand(this, attrs))
      return this
    }

    remove() {
      this.entity.runCommand(new RemoveColumnCommand(this))
    }
  }
}
