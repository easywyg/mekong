import Command from '../../undo_manager/command.js';

export default class extends Command {
  // entity = Entity | Particle
  constructor(entity, stateReference, name, newValue) {
    super()

    this.entity = entity
    this.stateReference = stateReference
    this.name = name
    this.oldValue = this.stateReference.attrs[this.name]
    this.newValue = newValue

    if (Array.isArray(this.newValue)) {
      this.newValue = this.newValue.join(' ')
    }
  }

  execute() {
    if (this.newValue === null && this.stateReference.attrs[this.name]) {
      delete this.stateReference.attrs[this.name];
    } else {
      this.stateReference.attrs[this.name] = this.newValue
    }

    this.entity.changeState()
  }

  undo() {
    if (this.oldValue === null && this.stateReference.attrs[this.name]) {
      delete this.stateReference.attrs[this.name];
    } else {
      this.stateReference.attrs[this.name] = this.oldValue;
    }

    this.entity.changeState()
  }
}
