import Command from '../undo_manager/command.js';
import RemoveCommand from './remove.js';

// InsertCommand
// Insert one entity into another entity
export default class extends Command {
  constructor(targetEntity, entity) {
    super()

    this.targetEntity = targetEntity
    this.entity = entity
  }

  // Вставка нового entity в DOM
  execute() {
    this.entity.node = this.targetEntity.node.appendChild(this.entity.node)
    this.entity.parentEntity = this.targetEntity
    this.entity.changeState()
    return true
  }

  // Отмена вставки entity в DOM
  undo() {
    return (new RemoveCommand(this.entity)).execute()
  }

  // Восстановление entity (отмена undo())
  redo() {
    this.entity.vtree = this.entity.view.render(this.entity)
    this.entity.node = this.entity.core.VDOM.create(this.entity.vtree, {
      document: this.targetEntity.node.ownerDocument
    })

    return this.execute()
  }
}
