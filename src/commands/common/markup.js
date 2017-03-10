import Command from '../../undo_manager/command.js';

export default class extends Command {
  // entity = Entity | Particle
  constructor(entity, stateReference, tag, start, end, attrs) {
    super()

    this.entity = entity
    this.stateReference = stateReference
    this.oldMarkup = stateReference.markup.splice(0)
    this.tag = tag
    this.start = start
    this.end = end
    this.attrs = attrs || {}
  }

  hasMarkup(tag, start, end) {
    return this.stateReference.markup.findIndex((b) => {
      return tag == b[0] && start == b[1] && end == b[2]
    }) != -1
  }

  execute() {
    if (!this.hasMarkup(this.tag, this.start, this.end)) {
      this.stateReference.markup.push([this.tag, this.start, this.end, this.attrs])
    }
  }

  undo() {
    const index = this.stateReference.markup.findIndex((b) => {
      return this.tag == b[0] && this.start == b[1] && this.end == b[2]
    })

    if (index != -1) {
      this.stateReference.markup.splice(index, 1)
    }
  }

  redo() {
    this.execute()
    this.entity.onStateChange(this)
  }
}
