import Command from '../../undo_manager/command.js';
import EntityUtils from '../../lib/entity_utils.js';

export default class extends Command {
  // entity = Entity | Particle
  constructor(entity, stateReference, newText, start, end) {
    super()

    this.entity = entity
    this.stateReference = stateReference
    this.oldBounds = { start: this.stateReference.start, end: this.stateReference.end }
    this.oldText = this.stateReference.text
    this.newText = newText
    this.start = start
    this.end = end
    this.isTextChanged = this.oldText != this.newText
  }

  execute() {
    if (!this.isTextChanged) {
      return
    }

    this.stateReference.text = EntityUtils.updateText(
      this.oldText, this.newText, this.start, this.end
    )

    this.entity.changeState()
  }

  undo() {
    const command = new this.constructor(
      this.entity, this.stateReference, this.oldText, this.oldBounds.start, this.oldBounds.end
    )

    this.entity.runCommand(command, true)
  }
}
