import Command from '../undo_manager/command.js';

export default class extends Command {
  constructor(entity, newTag) {
    super()

    this.entity = entity
    this.oldTag = this.entity.getTag()
    this.newTag = newTag.toLowerCase()
    this.isTagChanged = this.oldTag != this.newTag && this.newTag.length > 0
    this.allowedTags = ['p', 'pre', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  }

  isAllowed(tag) {
    return this.allowedTags.includes(tag)
  }

  execute() {
    if (!this.isTagChanged || !this.isAllowed(this.newTag)) {
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
