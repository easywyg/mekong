import merge from 'deepmerge';
import Command from 'undo_manager/command.js';
import EntityUtils from 'lib/entity_utils.js';

// TextCommand
export default class extends Command {
  constructor(doc, entityId, newState) {
    super()

    this.doc      = doc
    this.entityId = entityId
    this.entity   = this.doc.find(this.entityId)
    this.oldState = merge({}, this.entity.state)
    this.newState = newState
  }

  // Обновление стейта сущности. Устанавливает новый текст.
  execute() {
    const newState = merge(this.entity.state, this.newState)
    if (this.oldState.text == newState.text) return false

    this.entity.state.text = EntityUtils.updateText(
      this.oldState.text, newState.text, newState.start, newState.end
    )

    this.entity.changeState()
    return true
  }

  undo() {
    return new this.constructor(
      this.doc, this.entityId, {
        text: this.oldState.text,
        start: this.oldState.start,
        end: this.oldState.end
      }
    ).execute()
  }
}
