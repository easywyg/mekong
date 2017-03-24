import Command from '../../undo_manager/command.js';
import CreateCommand from './create.js';

// RemoveCommand
// Remove entity from DOM
export default class extends Command {
  constructor(doc, entity) {
    super()

    this.doc = doc
    this.entity = entity
    this.parent = this.entity.node.parentNode
    this.parentEntity = this.entity.parentEntity
  }

  // Remove entity from document
  execute() {
    const index = this.doc.findIndex(this.entity.id)
    if (index == -1 || !this.entity.policy.canBeRemoved()) return false

    this.parent.removeChild(this.entity.node)
    this.entity.node = null
    this.entity.vtree = null
    this.entity.parentEntity = null
    this.entity.changeState()
    this.doc.state.entities.splice(index, 1)

    return true
  }

  // Restore in document
  undo() {
    return (new CreateCommand(this.doc, this.parentEntity, this.entity)).execute()
  }
}
