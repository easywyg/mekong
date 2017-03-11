import Command from '../undo_manager/command.js';
import InsertCommand from './insert.js';

// RemoveCommand
// Remove entity from DOM
export default class extends Command {
  constructor(removeEntity) {
    super()

    this.removeEntity = removeEntity
    //this.core = core
    //this.root = root
    //this.entity = entity
  }

  execute() {
    this.removeEntity.node.parentNode.removeChild(this.removeEntity.node)
    this.removeEntity.node = null
    this.removeEntity.vtree = null
    this.removeEntity.changeState()
  }

  undo() {
    (new InsertCommand(this.removeEntity.node.parentNode.entity, this.removeEntity)).execute()
  }
}
