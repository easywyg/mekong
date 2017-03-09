import Command from '../../../undo_manager/command.js';

export default class extends Command {
  constructor(entity, name) {
    super()

    this.entity = entity
    this.name = name
    this.oldValue = this.entity.getAttr(this.name)
  }

  execute() {
    if (this.entity.state.attrs[this.name]) {
      delete this.entity.state.attrs[this.name]
    }
  }

  undo() {
    this.entity.state.attrs[this.name] = this.oldValue
  }
}
