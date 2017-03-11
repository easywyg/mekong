import TextCommand from '../commands/text.js';

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

  setText(newText, start, end) {
    this.runCommand(new TextCommand(this, this.state, newText, start, end))
  }
}

export default TextMethods;
