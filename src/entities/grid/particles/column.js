// Commands
import InsertColumnCommand from '../commands/insert_column.js';
import RemoveColumnCommand from '../commands/remove_column.js';

export default function(core) {
  return class extends core.Lib.Mix(core.Particle).with(core.Mixin.AttrMethods) {
    static type = 'grid_column'
    static defaultState = {
      tag: 'div',
      attrs: {}
    }

    constructor(entity) {
      super();
      this.entity = entity;
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
