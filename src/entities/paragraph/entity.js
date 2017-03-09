import View   from './view.js';
import Policy from './policies/entity.js';

import TextCommand from './commands/text.js';
import TagCommand from './commands/tag.js';
import MarkupCommand from './commands/markup.js';
import AttrCommand from './commands/attr.js';
import RemoveAttrCommand from './commands/remove_attr.js';
import RemoveMarkupCommand from './commands/remove_markup.js';

export default function(core) {
  // A Paragraph Entity
  return class extends core.Entity {
    constructor(root, options) {
      super(root, options);

      const self = this;

      // Reference to DOM node
      this.node = null

      // Entity's Virtual DOM tree
      this.vtree = null

      this.state = new Proxy(Object.assign({
        tag    : 'p',
        text   : '',
        start  : null,
        end    : null,
        attrs  : {},
        markup : []
      }, options || {}), {
        set(target, key, value) {
          target[key] = value
          self.onSetProp(target, key, value)
          return true
        }
      })

      // Entity's view object
      this.view = new (View(core))

      // Entity's policy object
      this.policy = new (Policy(core))(this)

      // Callbacks
      this.onStateChange = (command) => {}
      this.onSetProp = (target, propName, propValue) => {}
    }

    getText() {
      return this.state.text;
    }

    getTextBounds() {
      return {
        start: this.state.start,
        end: this.state.end
      }
    }

    getTag() {
      return this.state.tag
    }

    getMarkup() {
      return this.state.markup
    }

    getAttr(name) {
      return this.state.attrs[name]
    }

    getAttrs() {
      return this.state.attrs
    }

    hasMarkup(tag, start, end) {
      return this.state.markup.findIndex((b) => {
        return tag == b[0] && start == b[1] && end == b[2]
      }) != -1
    }

    setText(newText, start, end) {
      this.onStateChange(new TextCommand(this, newText, start, end))
    }

    setTag(newTag) {
      this.onStateChange(new TagCommand(this, newTag))
    }

    setMarkup(tag, start, end, attrs) {
      this.onStateChange(new MarkupCommand(this, tag, start, end, attrs))
    }

    setAttr(name, value) {
      this.onStateChange(new AttrCommand(this, name, value))
    }

    removeMarkup(tag, start, end) {
      this.onStateChange(new RemoveMarkupCommand(this, tag, start, end))
    }

    removeAttr(name) {
      this.onStateChange(new RemoveAttrCommand(this, name))
    }

    // Get type of Entity
    get type() {
      return 'paragraph';
    }
  }
}
