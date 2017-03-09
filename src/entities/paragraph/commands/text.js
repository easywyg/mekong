import Command from '../../../undo_manager/command.js';
import {updateText} from '../../../entity_utils.js';

// TODO: Нужна доработка undo()
export default class extends Command {
  constructor(entity, newText, start, end) {
    super()

    this.entity = entity
    this.oldBounds = this.entity.getTextBounds()
    this.oldText = this.entity.getText()
    this.newText = newText
    this.start = start
    this.end = end
    this.isTextChanged = this.oldText != this.newText
  }

  execute() {
    if (!this.isTextChanged) {
      return
    }

    this.entity.state.text = updateText(
      this.oldText, this.newText, this.start, this.end
    )

    this.entity.view.render()
  }

  undo() {
    this.entity.state.text = updateText(
      this.newText, this.oldText, this.oldBounds.start, this.oldBounds.end
    )

    this.entity.view.render()
  }
}
