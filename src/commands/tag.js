import Command from '../undo_manager/command.js';

export default class extends Command {
  constructor(entity, newTag) {
    super()

    this.entity = entity
    this.oldTag = this.entity.getTag()
    this.newTag = newTag
    this.isTagChanged = this.oldTag != this.newTag && this.newTag.length > 0
  }

  execute() {
    if (!this.isTagChanged) {
      return false
    }

    this.entity.state.tag = this.newTag
    this.entity.changeState()
    return true
  }

  undo() {
    this.entity.state.tag = this.oldTag
    this.entity.changeState()
    return true
  }
}
