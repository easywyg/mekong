import Command from '../../../undo_manager/command.js';

export default class extends Command {
  constructor(entity, name, newValue) {
    super()

    this.entity = entity
    this.name = name
    this.oldValue = this.entity.getAttr(this.name)
    this.newValue = newValue

    if (Array.isArray(this.newValue)) {
      this.newValue = this.newValue.join(' ')
    }
  }

  execute() {
    if (this.newValue === null && this.entity.state.attrs[name]) {
      delete this.entity.state.attrs[name];
    } else {
      this.entity.state.attrs[name] = this.newValue
    }

    this.entity.view.render()
  }

  undo() {
    if (this.oldValue === null && this.entity.state.attrs[name]) {
      delete this.entity.state.attrs[name];
    } else {
      this.entity.state.attrs[name] = this.oldValue;
    }

    this.entity.view.render()
  }
}
