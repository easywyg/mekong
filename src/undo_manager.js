// UndoManager
export default class {
  constructor() {
    this.commands = []
    this.stackPosition = -1
    this.savePosition = -1
    this.ready = true
    this.timeout = null
  }

  execute(command) {
    this._clearRedo();

    //if (this.ready) {
      const success = command.execute();

      if (success) {
        this.commands.push(command);
        this.stackPosition++;
        this.changed();
        this.ready = false
        return true
      }
    //}

    /*if (this.timeout != null) {
      clearTimeout(this.timeout)
    }

    this.timeout = setTimeout(() => {
      this.ready = true
    }, 0)*/

    return false
  }

  undo() {
    if (this.commands[this.stackPosition].undo()) {
      this.stackPosition--;
      this.changed();
    }
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

