// A UndoManager
export default class {
  constructor(options) {
    this.bindings = {};
    this.options = {
      buffer: 1000,
      synchronizeOnUpdate: false,
      comparator: function(a, b) {
        return a === b;
      }
    };

    this.reset(this.options.state);
  }

  reset(state, options) {
    if (options == null) {
      options = {};
    }

    this.clearTimeout();

    delete this.undos;
    delete this.redos;
    delete this.bufferTimeout;

    this.undos = [];
    this.redos = [];
    this.bufferReady = true;

    return this.state = state;
  }

  undo(cb) {
    if (!this.canUndo()) {
      return false;
    }

    this.redos.push(this.state);
    this.state = this.undos.pop();

    if (cb) {
      cb(this.state);
    }

    this.synchronize();
    return this.undos.length;
  }

  redo(cb) {
    if (!this.canRedo()) {
      return false;
    }

    this.undos.push(this.state);
    this.state = this.redos.pop();

    if (cb) {
      cb(this.state);
    }

    this.synchronize();
    return this.redos.length;
  }

  canUndo() {
    return this.undos.length > 0;
  }

  canRedo() {
    return this.redos.length > 0;
  }

  update(state, options) {
    //l(state)
    if (options == null) {
      options = {};
    }

    if (this.options.comparator(this.state, state) && !options.force) {
      return false;
    }

    this.redos = [];
    if (options.force || this.bufferReady) {
      //l('writeHistory', this.state)
      this.undos.push(this.state);

      //if (cb) {
      //  cb(this.state);
      //}

      this.bufferReady = false;
    }

    this.clearTimeout();
    this.bufferTimeout = setTimeout(() => {
      return () => {
        return this.bufferReady = true;
      };
    }, this.options.buffer);

    this.state = state;
    return this.synchronize(this.options.synchronizeOnUpdate != null);
  }

  clearTimeout() {
    if (this.bufferTimeout != null) {
      return clearTimeout(this.bufferTimeout);
    }
  }

  synchronize(options) {
    if ((this.options.synchronize != null)) {
      return this.options.synchronize(this.state);
    }
  }
}
