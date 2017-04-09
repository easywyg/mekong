import merge from 'deepmerge';
import Command from 'undo_manager/command.js';
import InsertColumnCommand from './insert.js';

export default class extends Command {
  constructor(column) {
    super()

    this.column = column
    this.grid = this.column.entity
    this.attrs = this.column.state.attrs
  }

  execute() {
    this.column.state = merge({}, this.column.constructor.defaultState)

    const index = this.grid.state.columns.findIndex((column) => {
      return column === this.column
    })

    if (index > 0) {
      this.grid.state.columns.splice(index, 1)
      this.grid.changeState()
      return true
    }

    return false
  }

  undo() {
    return (new InsertColumnCommand(this.column, this.attrs)).execute()
  }
}
