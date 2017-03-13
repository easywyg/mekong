import Command from '../undo_manager/command.js';
import InsertCommand from './insert.js';

// RemoveCommand
// Remove entity from DOM
export default class extends Command {
  constructor(removeEntity) {
    super()

    this.removeEntity = removeEntity
    this.parent = this.removeEntity.node.parentNode
    this.parentEntity = this.removeEntity.parentEntity
  }

  execute() {
    this.parent.removeChild(this.removeEntity.node)
    this.removeEntity.node = null
    this.removeEntity.vtree = null
    this.removeEntity.parentEntity = null
    this.removeEntity.changeState()

    return true
  }

  undo() {
    this.removeEntity.vtree = this.removeEntity.view.render(this.removeEntity)
    this.removeEntity.node = this.removeEntity.core.VDOM.create(this.removeEntity.vtree, {
      document: this.parent.ownerDocument
    })

    this.removeEntity.node = this.parent.appendChild(this.removeEntity.node)
    return (new InsertCommand(this.parentEntity, this.removeEntity)).execute()
  }
}
