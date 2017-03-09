import Command from '../undo_manager/command.js';
import InsertCommand from './insert.js';

// RemoveCommand
export default class extends Command {
  constructor(root, entity) {
    super()

    this.root = root
    this.entity = entity
  }

  execute() {
    this.entity.node.parentNode.removeChild(this.entity.node)
    this.entity.node = null
    this.entity.vtree = null
  }

  undo() {
    (new InsertCommand(this.root, this.entity)).execute()
  }
}
