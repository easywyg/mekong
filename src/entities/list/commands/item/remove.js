import Command from '../../../../undo_manager/command.js';

export default class extends Command {
  constructor() {
    super()
  }

  execute() {
    return false
  }

  undo() {
    return false
  }
}
