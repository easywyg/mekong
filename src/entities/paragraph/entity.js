import View   from './view.js';
import Policy from './policies/entity.js';

class BufferedUndoManager {
  constructor(options) {
    this.bindings = {}
    this.options = {
      buffer: 1000,
      synchronizeOnUpdate: false,
      comparator: function(a, b) {
        return a === b;
      }
    }
    this.reset(this.options.state);
  }

  reset(state, options) {
    if (options == null) {
      options = {}
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
    //this.trigger('undo', this.state);
    cb(this.state)
    this.synchronize();
    return this.undos.length;
  }

  redo(cb) {
    if (!this.canRedo()) {
      return false;
    }
    this.undos.push(this.state);
    this.state = this.redos.pop();
    //this.trigger('redo', this.state);
    cb(this.state)
    this.synchronize();
    return this.redos.length;
  }

  canUndo() {
    return this.undos.length > 0;
  }

  canRedo() {
    return this.redos.length > 0;
  }

  on() {
    /*var args, ref;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return (ref = $(this)).on.apply(ref, args);*/
  }

  off() {
    /*var args, ref;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return (ref = $(this)).off.apply(ref, args);*/
  }

  update(state, options) {
    if (options == null) {
      options = {}
    }
    if (this.options.comparator(this.state, state) && !options.force) {
      return false;
    }
    this.redos = [];
    if (options.force || this.bufferReady) {
      this.undos.push(this.state);
      this.trigger('push', this.state);
      this.bufferReady = false;
    }
    this.clearTimeout();
    this.bufferTimeout = setTimeout((function(_this) {
      return function() {
        _this.trigger('buffered', _this.state);
        return _this.bufferReady = true;
      }
    })(this), this.options.buffer);
    this.state = state;
    return this.synchronize(this.options.synchronizeOnUpdate != null);
  }

  clearTimeout() {
    if (this.bufferTimeout != null) {
      return clearTimeout(this.bufferTimeout);
    }
  }

  trigger() {
    /*var args, ref;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return (ref = $(this)).triggerHandler.apply(ref, args);*/
  }

  synchronize(options) {
    this.trigger('change', this.state);
    if ((this.options.synchronize != null) && callThrough) {
      return this.options.synchronize(this.state);
    }
  }
}

export default function(core) {
  // A Paragraph Entity
  return class extends core.Entity {
    constructor(root, options) {
      super(root, options);

      this.keepHistory = true;
      this.undoManager = new core.UndoManager;

      const self = this;

      this.state = Object.assign({
        tag    : 'p',
        text   : '',
        start  : null,
        end    : null,
        attrs  : {},
        markup : []
      }, options || {})

      // Entity's view object
      this.view = new (View(core))(this);

      // Entity's policy object
      this.policy = new (Policy(core))(this);
    }

    // TODO: Move it to entity_utils.js
    // Обновить текст в соответствии с переданными параметрами
    _updateText(original, update, start, end) {
      if (typeof update == 'undefined') return original;

      // Обновляем текст целиком
      if (typeof start == 'undefined' && typeof end == 'undefined' || start == null && end == null) {
        return update;

      // Обновляем текст на указанных позициях
      } else {
        const len = original.length;

        if (start > len || end > len) return original;
        if (start == null || end == null) return original;

        const startBefore = 0;
        const endBefore   = start;
        const startAfter  = end;
        const endAfter    = len;

        return [
          original.substr(startBefore, endBefore),
          update,
          original.substr(startAfter, endAfter)
        ].join('')
      }
    }

    getText() {
      return this.state.text;
    }

    setText(newText, start, end) {
      // Update text
      if (String.isString(newText) && this.getText() != newText) {
        this.state.text = this._updateText(
          this.getText(), newText, start, end
        )

        this.commit()
        return true
      }

      return false
    }

    getTag() {
      return this.state.tag
    }

    // Update tag
    setTag(newTag) {
      if (String.isString(newTag) && newTag.length > 0) {
        this.state.tag = newState.tag
        this.commit()
        return true
      }

      return false
    }

    getMarkup() {
      return this.state.markup
    }

    setMarkup(tag, start, end, attrs) {
      let hasMarkup = this.state.markup.findIndex((b) => {
        return tag == b[0] && start == b[1] && end == b[2]
      }) != -1

      if (!hasMarkup) {
        this.state.markup.push([tag, start, end, attrs || {}])
        this.commit()
        return true
      }

      return false
    }

    removeMarkup(tag, start, end) {
      this.state.markup = []
      this.commit()
      return null
    }

    setAttr(name, value) {
      if (Array.isArray(value)) {
        value = value.join(' ')
      }

      this.state.attrs[name] = value
      this.commit()
      return true
    }

    removeAttr(name) {
      delete this.state.attrs[name]
      this.commit()
      return null
    }

    removeAttrs() {
      this.state.attrs = []
      this.commit()
      return null
    }

    getAttrs() {
      return this.state.attrs
    }

    update(newState) {
      if (newState.text) {
        this.setText(newState.text, newState.start, newState.end)
      }

      this.state.markup = []
      newState.markup.forEach((markup) => {
        this.setMarkup(markup[0], markup[1], markup[2], markup[3])
      })

      this.view.render()
    }

    commit() {
      if (this.keepHistory) {
        let state = JSON.parse(JSON.stringify(this.state))
        this.undoManager.update(state, { force: true });
      }

      this.view.render()
      return null;
    }

    undo() {
      this.undoManager.undo((prevState) => {
        if (!prevState) return
        this.keepHistory = false
        this.update(prevState)
        this.keepHistory = true
      });

      return null
    }

    redo() {
      this.undoManager.redo((nextState) => {
        if (!nextState) return

        this.keepHistory = false
        this.update(nextState)
        this.keepHistory = true
      });

      return null
    }

    // Get type of Entity
    get type() {
      return 'paragraph';
    }
  }
}
