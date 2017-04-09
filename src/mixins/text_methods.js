import TextCommand from 'commands/entity/text.js';

const TextMethods = (superclass) => class extends superclass {
  getText() {
    return this.state.text;
  }

  getTextBounds() {
    return {
      start: this.state.start,
      end: this.state.end
    }
  }

  setText(text, start, end) {
    this.runCommand(new TextCommand(this.document, this.id, { text, start, end }))
  }
}

export default TextMethods;
