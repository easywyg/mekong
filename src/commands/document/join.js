import Command from '../../undo_manager/command.js';

// JoinCommand
export default class extends Command {
  constructor(doc, entity, withEntity) {
    super()

    this.doc = doc
    this.entity = entity
    this.withEntity = withEntity
  }

  execute() {
    if (!this.entity.policy.canBeJoined(this.withEntity)) {
      return false
    }
  }

  undo() {
    // todo
  }
}
