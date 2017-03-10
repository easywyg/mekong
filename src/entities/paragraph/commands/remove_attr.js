import Command from '../../../undo_manager/command.js';

export default class extends Command {
  // entity = Entity | Particle
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
    }
  }

  undo() {
    this.stateReference.attrs[this.name] = this.oldValue
  }

  redo() {
    this.execute()
    this.entity.onStateChange(this)
  }
}
