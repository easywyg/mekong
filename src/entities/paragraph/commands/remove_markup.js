import Command from '../../../undo_manager/command.js';

export default class extends Command {
  constructor(entity, tag, start, end) {
    super()

    this.entity = entity
    this.tag = tag
    this.start = start
    this.end = end
    this.attrs = this.entity.getMarkup(
      this.tag, this.start, this.end
    ).slice(0)
  }

  execute() {
    const index = this.entity.state.markup.findIndex((b) => {
      return this.tag == b[0] && this.start == b[1] && this.end == b[2]
    })

    if (index != -1) {
      this.entity.state.markup.splice(index, 1)
    }

    this.entity.view.render()
  }

  undo() {
    this.entity.state.markup.push([this.tag, this.start, this.end, this.attrs])
    this.entity.view.render()
  }
}
