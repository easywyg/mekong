import TextCommand from '../entities/paragraph/commands/text.js';

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
    this.onStateChange(new TextCommand(this, this.state, newText, start, end))
  }
}

export default TextMethods;
