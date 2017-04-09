import Command from 'undo_manager/command.js';
import RemoveCommand from './remove.js';
import SplitCommand from './split.js';

// JoinCommand
export default class extends Command {
  constructor(doc, entity, withEntity) {
    super()

    this.doc = doc
    this.entity = entity
    this.withEntity = withEntity
    this.position = this.entity.getText().length
  }

  joinMarkup() {
    const len = this.entity.state.text.length
    const topMarkup = this.entity.state.markup.slice()
    const bottomMarkup = this.withEntity.state.markup.slice()

    return topMarkup.concat(bottomMarkup.map((m) => { m[2] += len; return m } ))
  }

  execute() {
    if (!this.entity.policy.canBeJoined(this.withEntity)) {
      return false
    }

    this.entity.state.markup = this.joinMarkup()
    this.entity.state.text += this.withEntity.state.text
    this.entity.node.normalize()
    this.entity.changeState()

    return (new RemoveCommand(this.doc, this.withEntity)).execute()
  }

  undo() {
    const command = new SplitCommand(this.doc, this.entity, this.position)
    const result = command.execute()

    this.withEntity = command.newParagraph
    return result
  }

  redo() {
    const command = new this.constructor(this.doc, this.entity, this.withEntity)
    return command.execute()
  }
}
