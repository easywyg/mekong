import Command from '../undo_manager/command.js';
import InsertCommand from './insert.js';

// RemoveCommand
export default class extends Command {
  constructor(core, root, entity) {
    super()

    this.core = core
    this.root = root
    this.entity = entity
  }

  execute() {
    this.entity.node.parentNode.removeChild(this.entity.node)
    this.entity.node = null
    this.entity.vtree = null
    this.entity.changeState()
  }

  undo() {
    (new InsertCommand(this.core, this.root, this.entity)).execute()
  }
}
