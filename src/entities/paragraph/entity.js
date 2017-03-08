import View   from './view.js';
import Policy from './policies/entity.js';

export default function(core) {
  // A Paragraph Entity
  return class extends core.Entity {
    constructor(root, options) {
      super(root, options);

      this.history = [];
      this.historyPos = 0;

      const self = this;

      this._state = {
        tag    : 'p',
        text   : '',
        start  : null,
        end    : null,
        attrs  : {},
        markup : []
      }, options || {};

      this.state = new Proxy(this._state, {
        set(target, key, value) {
          target[key] = value;

          if (self.history.length > 0) {
            self.historyPos++
          }

          self.history.push(Object.assign({}, self.state))

          self.render()

          return true
        }
      });

      // Entity's view object
      this.view = new (View(core))(this);

      // Entity's policy object
      this.policy = new (Policy(core))(this);
    }

    canUndo() {}

    canRedo() {}

    undo() {
      this.update(this.history[this.historyPos--])
    }

    redo() {}

    // Get type of Entity
    get type() {
      return 'paragraph';
    }
  }
}
