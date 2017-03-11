import MarkupCommand from '../commands/markup.js';

const MarkupMethods = (superclass) => class extends superclass {
  getMarkup() {
    return this.state.markup
  }

  hasMarkup(tag, start, end) {
    return this.state.markup.findIndex((b) => {
      return tag == b[0] && start == b[1] && end == b[2]
    }) != -1
  }

  setMarkup(tag, start, end, attrs) {
    this.runCommand(new MarkupCommand(this, this.state, tag, start, end, attrs))
  }

  removeMarkup(tag, start, end) {
    this.runCommand(new RemoveMarkupCommand(this, this.state, tag, start, end))
  }
}

export default MarkupMethods;
