import Command from '../../undo_manager/command.js';
import InsertCommand from './insert.js';

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
    this.entity.vtree = this.entity.view.render(this.entity)
    this.entity.node = this.entity.core.VDOM.create(this.entity.vtree, {
      document: this.parent.ownerDocument
    })

    this.entity.node = this.parent.appendChild(this.entity.node)
    return (new InsertCommand(this.doc, this.parentEntity, this.entity)).execute()
  }
}
