import Command from '../../undo_manager/command.js';

// LineBreakCommand
export default class extends Command {
  constructor(doc, entity, position) {
    super()

    this.doc = doc
    this.entity = entity
    this.position = position
  }

  execute() {
    if (!this.entity.policy.canLineBreak(this.position)) {
      return false
    }

    // Хм, походу надо добавить это в стейт
    const lineBreak = this.entity.policy.constructor.lineBreak

    return true
  }

  undo() {

  }
}
