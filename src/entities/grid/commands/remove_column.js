import Command from '../../../undo_manager/command.js';
import InsertColumnCommand from './insert_column.js';

export default class extends Command {
  constructor(particle) {
    super()

    this.particle = particle
    this.entity = this.particle.entity
    this.attrs = this.particle.state.attrs
  }

  execute() {
    this.particle.state = Object.assign({}, this.particle.constructor.defaultState)

    const index = this.entity.state.columns.findIndex((column) => {
      return column === this.particle
    })

    this.entity.state.columns.splice(index, 1)
    this.entity.changeState()
  }

  undo() {
    (new InsertColumnCommand(this.particle, this.attrs)).execute()
  }
}
