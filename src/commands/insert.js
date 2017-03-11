import Command from '../undo_manager/command.js';
import RemoveCommand from './remove.js';

// InsertCommand
// Insert one entity into another entity
export default class extends Command {
  constructor(targetEntity, insertEntity) {
    super()

    this.targetEntity = targetEntity
    this.insertEntity = insertEntity
  }

  execute() {
    this.insertEntity.node = this.targetEntity.node.appendChild(this.insertEntity.node)
    this.insertEntity.parentEntity = this.targetEntity
    this.insertEntity.changeState()
  }

  undo() {
    (new RemoveCommand(this.core, this.root, this.entity)).execute()
  }
}
