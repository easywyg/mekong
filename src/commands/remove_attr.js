import Command from '../undo_manager/command.js';
import AttrCommand from './attr.js';

// RemoveAttrCommand
export default class extends Command {
  constructor(doc, entityId, name, value = null) {
    super()

    this.doc      = doc
    this.entityId = entityId
    this.entity   = this.doc.find(this.entityId)
    this.oldState = { name: name, value: this.entity.state.attrs[name] }
    this.newState = { name, value }
  }

  execute() {
    if (this.entity.state.attrs[this.newState.name]) {
      delete this.entity.state.attrs[this.newState.name]
      this.entity.changeState()
      return true
    }

    return false
  }

  undo() {
    return new AttrCommand(
      this.doc, this.entityId, this.oldState.name, this.oldState.value
    ).execute()
  }
}
