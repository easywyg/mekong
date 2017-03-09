// UndoManager
export default class {
  constructor() {
    this.commands = [];
    this.stackPosition = -1;
    this.savePosition = -1;
  }

  execute(command) {
    this._clearRedo();

    command.execute();

    this.commands.push(command);
    this.stackPosition++;
    this.changed();
  }

  undo() {
    this.commands[this.stackPosition].undo();
    this.stackPosition--;
    this.changed();
  }

  canUndo() {
    return this.stackPosition >= 0;
  }

  redo() {
    this.stackPosition++;
    this.commands[this.stackPosition].redo();
    this.changed();
  }

  canRedo() {
    return this.stackPosition < this.commands.length - 1;
  }

  save() {
    this.savePosition = this.stackPosition;
    this.changed();
  }

  dirty() {
    return this.stackPosition != this.savePosition;
  }

  _clearRedo() {
    // TODO there's probably a more efficient way for this
    this.commands = this.commands.slice(0, this.stackPosition + 1);
  }

  changed() {
    // do nothing, override
  }
}

