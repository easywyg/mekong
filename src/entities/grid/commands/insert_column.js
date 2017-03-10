import Command from '../../../undo_manager/command.js';
import RemoveColumnCommand from './remove_column.js';

export default class extends Command {
  constructor(particle, attrs) {
    super()

    this.particle = particle
    this.entity = this.particle.entity
    this.attrs = attrs || {}
  }

  execute() {
    // Update particle attrs
    this.particle.state.attrs = Object.assign(
      this.particle.state.attrs, this.attrs
    )

    // Add column to Grid state
    this.entity.state.columns.push(this.particle)
    this.entity.changeState()
  }

  undo() {
    (new RemoveColumnCommand(this.particle)).execute()
  }
}
