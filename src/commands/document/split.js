import Command from '../../undo_manager/command.js';

// SplitCommand
export default class extends Command {
  constructor(doc, entity, position) {
    super()

    this.doc = doc
    this.entity = entity
    this.position = position
    this.entities = {
      top: null,
      bottom: null
    }
  }

  execute() {
    if (!this.entity.policy.canBeSplitted(this.position)) {
      return false
    }

    const text = this.entity.state.text
    const topText = text.substring(0, this.position)
    const bottomText = text.substring(this.position, text.length)

    // Создать 2 сущности и сразу вставить их
    //const topEntity = this.doc.create('Paragraph') // ???

    return this.entities
  }

  undo() {
    // todo
  }
}
