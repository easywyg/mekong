import Command from '../undo_manager/command.js';

// MoveCommand
export default class extends Command {
  constructor(root, entity, anotherEntity) {
    super()

    this.root = root
    this.entity = entity
    this.anotherEntity = anotherEntity
  }

  execute() {
    // todo
  }

  undo() {
    // todo
  }
}
