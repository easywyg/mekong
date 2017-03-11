import Command from '../undo_manager/command.js';

export default class extends Command {
  constructor(entity, stateReference, name) {
    super()

    this.entity = entity
    this.stateReference = stateReference
    this.name = name
    this.oldValue = this.entity.getAttr(this.name)
  }

  execute() {
    if (this.stateReference.attrs[this.name]) {
      delete this.stateReference.attrs[this.name]
      this.entity.changeState()
    }
  }

  undo() {
    this.stateReference.attrs[this.name] = this.oldValue
    this.entity.changeState()
  }
}
