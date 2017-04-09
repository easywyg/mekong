import merge from 'deepmerge';
import Command from 'undo_manager/command.js';
import RemoveMarkupCommand from './remove_markup.js';

// TODO: Нужно сделать от дельную команду для изменения атрибутов маркапа
export default class extends Command {
  constructor(doc, entityId, newState) {
    super()

    this.doc      = doc
    this.entityId = entityId
    this.entity   = this.doc.find(this.entityId)
    this.newState = newState
    this.newState.attrs = merge({}, this.newState.attrs || {})
    this.allowedTags = [
      'a', 'em', 'strong', 'small', 's', 'cite', 'quote', 'dfn', 'abbr', 'time', 'code',
      'var', 'samp', 'kbd', 'sub', 'sup', 'u', 'span', 'mark', 'ruby', 'rt', 'rp', 'bdi', 'bdo',
      'wbr', 'ins', 'del', 'i', 'b', 'strike', 'q', 'acronym', 'big', 'dir', 'tt'
    ]
  }

  isAllowed(tag) {
    return this.allowedTags.includes(tag)
  }

  getMarkupIndex(state) {
    return this.entity.state.markup.findIndex((b) => {
      return state.tag == b[0] && state.start == b[1] && state.end == b[2]
    })
  }

  execute() {
    if (!this.isAllowed(this.newState.tag)) return false
    const index = this.getMarkupIndex(this.newState)

    if (index != -1) return false
    this.entity.state.markup.push([
      this.newState.tag, this.newState.start, this.newState.end, this.newState.attrs
    ])

    this.entity.changeState()
    return true
  }

  undo() {
    return (new RemoveMarkupCommand(this.doc, this.entityId, this.newState)).execute()
  }
}
