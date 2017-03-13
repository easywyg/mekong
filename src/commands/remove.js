import Command from '../undo_manager/command.js';
import InsertCommand from './insert.js';

// RemoveCommand
// Remove entity from DOM
export default class extends Command {
  constructor(entity) {
    super()

    this.entity = entity
    this.parent = this.entity.node.parentNode
    this.parentEntity = this.entity.parentEntity
  }

  execute() {
    this.parent.removeChild(this.entity.node)
    this.entity.node = null
    this.entity.vtree = null
    this.entity.parentEntity = null
    this.entity.changeState()

    return true
  }

  undo() {
    this.entity.vtree = this.entity.view.render(this.entity)
    this.entity.node = this.entity.core.VDOM.create(this.entity.vtree, {
      document: this.parent.ownerDocument
    })

    this.entity.node = this.parent.appendChild(this.entity.node)
    return (new InsertCommand(this.parentEntity, this.entity)).execute()
  }
}
