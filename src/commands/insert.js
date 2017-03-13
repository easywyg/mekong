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
    return true
  }

  undo() {
    return (new RemoveCommand(this.insertEntity)).execute()
  }

  redo() {
    l('insert redo')
    //return true

    // Восстанавливаем удаленный методом undo() элемент
    this.insertEntity.vtree = this.insertEntity.view.render(this.insertEntity)
    this.insertEntity.node = this.insertEntity.core.VDOM.create(this.insertEntity.vtree, {
      document: this.targetEntity.node.ownerDocument
    })

    return this.execute()
  }
}
