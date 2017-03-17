import merge from 'deepmerge';
import Command from '../../undo_manager/command.js';

export default class extends Command {
  constructor(doc, entityId, newState) {
    super()

    this.doc      = doc
    this.entityId = entityId
    this.entity   = this.doc.find(this.entityId)
    this.oldState = merge({}, this.entity.state)
    this.newState = newState
    this.allowedTags = ['p', 'pre', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  }

  isAllowed(tag) {
    return this.allowedTags.includes(tag.toLowerCase())
  }

  isTagChanged(tag) {
    return this.oldState.tag != this.newState.tag
  }

  execute() {
    const newState = merge(this.entity.state, this.newState)

    if (!this.isTagChanged || !this.isAllowed(newState.tag)) return false

    this.entity.state.tag = newState.tag
    this.entity.changeState()
    return true
  }

  undo() {
    return new this.constructor(
      this.doc, this.entityId, { tag: this.oldState.tag }
    ).execute()
  }
}
