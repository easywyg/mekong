import Command from '../../undo_manager/command.js';

// MoveCommand
export default class extends Command {
  constructor(doc, entity, beforeEntity, containerEntity) {
    super()

    this.doc = doc
    this.entity = entity
    this.beforeEntity = beforeEntity
    this.containerEntity = containerEntity
  }

  execute() {
    if (!this.entity.policy.canBeMoved(this.beforeEntity, this.containerEntity)) {
      return false
    }
  }

  undo() {
    // todo
  }
}
