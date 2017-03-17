import Command from '../../undo_manager/command.js';

export default class extends Command {
  constructor(doc, entityId, name, value) {
    super()

    this.doc      = doc
    this.entityId = entityId
    this.entity   = this.doc.find(this.entityId)
    this.oldState = { name: name, value: this.entity.state.attrs[name] }
    this.newState = { name, value }

    if (Array.isArray(this.newState.value)) {
      this.newState.value = this.newState.value.join(' ')
    }
  }

  execute() {
    if (this.newState.value === null && this.oldState.value) {
      delete this.entity.state.attrs[this.newState.name];
    } else {
      this.entity.state.attrs[this.newState.name] = this.newState.value
    }

    this.entity.changeState()
    return true
  }

  undo() {
    return new this.constructor(
      this.doc, this.entityId, this.oldState.name, this.oldState.value
    ).execute()
  }
}
