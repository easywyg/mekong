import Command from '../../../undo_manager/command.js';

export default class extends Command {
  // entity = Entity | Particle
  constructor(entity, stateReference, tag, start, end) {
    super()

    this.entity = entity
    this.stateReference = stateReference
    this.tag = tag
    this.start = start
    this.end = end
    this.attrs = this.stateReference.markup[this.getMarkupIndex()][3]
  }

  getMarkupIndex() {
    return this.stateReference.markup.findIndex((b) => {
      return this.tag == b[0] && this.start == b[1] && this.end == b[2]
    })
  }

  execute() {
    const index = this.getMarkupIndex()

    if (index != -1) {
      this.stateReference.markup.splice(index, 1)
    }
  }

  undo() {
    this.stateReference.markup.push([this.tag, this.start, this.end, this.attrs])
  }

  redo() {
    this.execute()
    this.entity.onStateChange(this)
  }
}
