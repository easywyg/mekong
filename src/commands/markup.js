import Command from '../undo_manager/command.js';

export default class extends Command {
  constructor(entity, stateReference, tag, start, end, attrs) {
    super()

    this.entity = entity
    this.stateReference = stateReference
    this.oldMarkup = stateReference.markup.slice()
    this.tag = tag
    this.start = start
    this.end = end
    this.attrs = attrs || {}
    this.oldAttrs = {}
    this.allowedTags = [
      'a', 'em', 'strong', 'small', 's', 'cite', 'quote', 'dfn', 'abbr', 'time', 'code',
      'var', 'samp', 'kbd', 'sub', 'sup', 'u', 'mark', 'ruby', 'rt', 'rp', 'bdi', 'bdo',
      'wbr', 'ins', 'del', 'i', 'b', 'strike', 'q', 'acronym', 'big', 'dir', 'tt'
    ]

    this.index = this.getMarkupIndex(this.tag, this.start, this.end)
    if (this.index != -1) {
      this.oldAttrs = Object.assign({}, this.stateReference.markup[this.index][3])
    }
  }

  isAllowed(tag) {
    return this.allowedTags.includes(tag)
  }

  getMarkupIndex(tag, start, end, attrs) {
    return this.stateReference.markup.findIndex((b) => {
      return tag == b[0] && start == b[1] && end == b[2]
    })
  }

  execute() {
    if (!this.isAllowed(this.tag)) {
      return false
    }

    // Markup exists - update its attributes
    if (this.index != -1) {
      // if new attrs are not empty
      if (Object.keys(this.attrs).length == 0) {
        return false
      }

      this.stateReference.markup[this.index][3] = this.attrs
    }
    // Markup not exists - so insert markup
    else {
      this.stateReference.markup.push([this.tag, this.start, this.end, this.attrs])
    }

    this.entity.changeState()
    return true
  }

  // Cancel markup insertion or
  // cancel its attributes update
  undo() {
    if (this.index != -1) {
      this.stateReference.markup[this.index][3] = this.oldAttrs
      this.entity.changeState()
      return true
    } else {
      const index = this.getMarkupIndex(this.tag, this.start, this.end)

      if (index != -1) {
        this.stateReference.markup.splice(index, 1)
        this.entity.changeState()
        return true
      }
    }

    return false
  }

  xundo() {
    const index = this.stateReference.markup.findIndex((b) => {
      return this.tag == b[0] && this.start == b[1] && this.end == b[2]
    })

    if (index != -1) {
      this.stateReference.markup.splice(index, 1)
      this.entity.changeState()
      return true
    }

    return false
  }
}
