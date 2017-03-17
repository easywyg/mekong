import merge from 'deepmerge';
import Command from '../../undo_manager/command.js';

export default class extends Command {
  constructor(doc, entityId, newState) {
    super()

    this.doc      = doc
    this.entityId = entityId
    this.entity   = this.doc.find(this.entityId)
    this.oldState = {}
    this.newState = newState
    this.attrs    = {}

    const index = this.getMarkupIndex();

    if (index != -1) {
      this.attrs = merge({}, this.entity.state.markup[index][3])
    }
  }

  getMarkupIndex() {
    return this.entity.state.markup.findIndex((b) => {
      return this.newState.tag == b[0] && this.newState.start == b[1] && this.newState.end == b[2]
    })
  }

  execute() {
    const index = this.getMarkupIndex()

    if (index != -1) {
      this.entity.state.markup.splice(index, 1)
      this.entity.changeState()
      return true
    }

    return false
  }

  undo() {
    this.entity.state.markup.push([this.newState.tag, this.newState.start, this.newState.end, this.attrs])
    this.entity.changeState()

    return true
  }
}
