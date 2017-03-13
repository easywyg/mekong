import merge from 'deepmerge';
import Command from '../undo_manager/command.js';

export default class extends Command {
  constructor(doc, entityId, newState) {
    super()

    this.doc      = doc
    this.entityId = entityId
    this.entity   = this.doc.find(this.entityId)
    this.oldAttrs = {}
    this.newState = newState
    this.newState.attrs = this.newState.attrs || {}
    this.allowedTags = [
      'a', 'em', 'strong', 'small', 's', 'cite', 'quote', 'dfn', 'abbr', 'time', 'code',
      'var', 'samp', 'kbd', 'sub', 'sup', 'u', 'mark', 'ruby', 'rt', 'rp', 'bdi', 'bdo',
      'wbr', 'ins', 'del', 'i', 'b', 'strike', 'q', 'acronym', 'big', 'dir', 'tt'
    ]

    // Keep old state if it exists
    this.index = this.getMarkupIndex(this.newState)
    if (this.index != -1) {
      this.oldAttrs = merge({}, this.entity.state.markup[this.index][3])
    }
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

    // Markup exists - update its attributes
    if (this.index != -1) {
      // if new attrs are not empty
      if (Object.keys(this.newState.attrs).length == 0) {
        return false
      }

      this.entity.state.markup[this.index][3] = this.newState.attrs
    }
    // Markup not exists - so insert markup
    else {
      this.entity.state.markup.push([
        this.newState.tag, this.newState.start, this.newState.end, this.newState.attrs
      ])
    }

    this.entity.changeState()
    return true
  }

  undo() {
    if (this.index != -1) {
      this.entity.state.markup[this.index][3] = this.oldAttrs
      this.entity.changeState()
      return true
    } else {
      const index = this.getMarkupIndex(this.newState)

      if (index != -1) {
        this.entity.state.markup.splice(index, 1)
        this.entity.changeState()
        return true
      }
    }

    return false
  }
}
