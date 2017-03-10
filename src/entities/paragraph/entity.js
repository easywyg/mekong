import mix from '../../lib/mix.js';

import View   from './view.js';
import Policy from './policies/entity.js';

// Commands
import TagCommand from './commands/tag.js';

// Mixins
import TextMethods from '../../mixins/text_methods.js'
import MarkupMethods from '../../mixins/markup_methods.js'
import AttrMethods from '../../mixins/attr_methods.js'

export default function(core) {
  // A Paragraph Entity
  return class Entity extends mix(core.Entity).with(TextMethods, MarkupMethods, AttrMethods) {
    static type = 'paragraph'
    static defaultState = {
      tag    : 'p',
      text   : '',
      start  : null,
      end    : null,
      attrs  : {},
      markup : []
    }

    get view() {
      return new (View(core))
    }

    get policy() {
      return new (Policy(core))(this)
    }

    getTag() {
      return this.state.tag
    }

    setTag(newTag) {
      this.onStateChange(new TagCommand(this, newTag))
    }
  }
}
