import Command from '../../../undo_manager/command.js';
import {updateText} from '../../../entity_utils.js';

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

    this.stateReference.text = updateText(
      this.oldText, this.newText, this.start, this.end
    )
  }

  undo() {
    const command = new this.constructor(
      this.entity, this.oldText, this.oldBounds.start, this.oldBounds.end
    )

    this.entity.onStateChange(command, true)
  }

  redo() {
    this.execute()
    this.entity.onStateChange(this)
  }
}
