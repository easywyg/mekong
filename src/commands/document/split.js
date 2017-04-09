import Command from 'undo_manager/command.js';
import CreateCommand from './create.js';
import JoinCommand from './join.js';
import MarkupCommand from '../entity/markup.js';
import EntityUtils from 'lib/entity_utils.js';

// SplitCommand
export default class extends Command {
  constructor(doc, entity, position) {
    super()

    this.doc = doc
    this.entity = entity
    this.position = position
    this.newParagraph = null
  }

  splitMarkup(markup, pos) {
    let newMarkup = { top: [], bottom: [] }

    markup.forEach((entry) => {
      let tag = entry[0]
      let start = entry[1]
      let end = entry[2]
      let attrs = entry[3]

      if (pos > start && pos < end) {
        newMarkup.top.push([tag, start, pos, attrs])
        newMarkup.bottom.push([tag, 0, end - pos, attrs])
      } else if (pos <= start && pos < end) {
        newMarkup.bottom.push([tag, start - pos, end - pos, attrs])
      } else if (pos >= start && pos > end) {
        newMarkup.top.push([tag, start, end, attrs])
      }
    })

    return newMarkup
  }

  execute() {
    if (!this.entity.policy.canBeSplitted(this.position)) {
      return false
    }

    const markup = this.entity.getMarkup()
    const text = this.entity.getText()
    const topText = text.substring(0, this.position)
    const bottomText = text.substring(this.position, text.length)

    this.entity.state.text = topText
    this.entity.state.markup = []

    // Create new paragraph
    const klass = this.doc.usedEntitities['paragraph'](this.doc.core)
    const entity = new klass({ text: bottomText })
    const command = new CreateCommand(this.doc, this.doc, entity, { after: this.entity })

    if (command.execute()) {
      const newMarkup = this.splitMarkup(markup, this.position)

      entity.state.markup = newMarkup.bottom
      entity.changeState()

      this.entity.state.markup = newMarkup.top
      this.entity.changeState()

      this.newParagraph = entity
      return true
    }

    return false
  }

  undo() {
    const command = new JoinCommand(this.doc, this.entity, this.newParagraph)
    return command.execute()
  }
}
