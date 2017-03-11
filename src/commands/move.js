import Command from '../undo_manager/command.js';

// MoveCommand
export default class extends Command {
  constructor(root, entity, containerEntity, beforeEntity) {
    super()

    this.root = root
    this.entity = entity
    this.containerEntity = containerEntity
    this.beforeEntity = beforeEntity
  }

  execute() {
    // todo
  }

  undo() {
    // todo
  }
}
