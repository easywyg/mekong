import merge from 'deepmerge';
import Command from 'undo_manager/command.js';
import RemoveMarkupCommand from './remove_markup.js';

export default class extends Command {
  constructor(doc, entityId, newState) {
    super()

    this.doc      = doc
    this.entityId = entityId
    this.entity   = this.doc.find(this.entityId)
    this.oldAttrs = {}
    this.newState = newState
  }

  getMarkupIndex(state) {
    return this.entity.state.markup.findIndex((b) => {
      return state.tag == b[0] && state.start == b[1] && state.end == b[2]
    })
  }

  execute() {
    const index = this.getMarkupIndex(this.newState)

    if (index == -1) {
      if (this.entity.state.markup[index]) {
        this.oldAttrs = merge({}, this.entity.state.markup[index][3] || {})
      }

    // Markup exists - update its attributes
    /*if (index != -1) {
      // if new attrs are not empty
      if (Object.keys(this.newState.attrs).length == 0) {
        return false
      }

      this.entity.state.markup[index][3] = this.newState.attrs
    }
    // Markup not exists - so insert markup
    else {*/
      //console.log('Markup not exists - so insert markup')
      this.entity.state.markup.push([
        this.newState.tag, this.newState.start, this.newState.end, this.newState.attrs
      ])
    //}

      this.entity.changeState()
      return true
    }

    return false
  }

  undo() {
    return (new RemoveMarkupCommand(this.doc, this.entityId, this.newState)).execute()
  }
/*
  xundo() {
    console.log('undo', this.newState)
    //return (new this.constructor(this.doc, this.entityId, this.newState)).execute()
    const idx = this.getMarkupIndex(this.newState)
    console.log('idx', idx, this.newState.tag, this.newState.start, this.newState.end, this.newState.attrs)

    // If markup exists
    if (idx != -1) {
      this.entity.state.markup[idx][3] = this.oldAttrs
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
*/
}
