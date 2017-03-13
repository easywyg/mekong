import merge from 'deepmerge';
import Command from '../../../../undo_manager/command.js';
import RemoveColumnCommand from './remove.js';

export default class extends Command {
  constructor(column, attrs) {
    super()

    this.column = column
    this.grid = this.column.entity
    this.attrs = attrs || {}
  }

  execute() {
    // Update column attrs
    this.column.state.attrs = merge(
      this.column.state.attrs, this.attrs
    )

    // Add column to Grid state
    this.grid.state.columns.push(this.column)
    this.grid.changeState()
    return true
  }

  undo() {
    return (new RemoveColumnCommand(this.column)).execute()
  }
}
