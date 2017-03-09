import Command from '../../../undo_manager/command.js';

export default class extends Command {
  constructor(entity, tag, start, end, attrs) {
    super()

    this.entity = entity
    this.oldMarkup = this.entity.getMarkup().splice(0)
    this.tag = tag
    this.start = start
    this.end = end
    this.attrs = attrs || {}
  }

  execute() {
    if (!this.entity.hasMarkup(this.tag, this.start, this.end)) {
      this.entity.state.markup.push([this.tag, this.start, this.end, this.attrs])
    }

    this.entity.view.render()
  }

  undo() {
    const index = this.entity.state.markup.findIndex((b) => {
      return this.tag == b[0] && this.start == b[1] && this.end == b[2]
    })

    if (index != -1) {
      this.entity.state.markup.splice(index, 1)
    }

    this.entity.view.render()
  }
}
