import View   from './view.js';
import Policy from './policies/preformatted.js';

export default function(core) {
  // A Paragraph Entity
  return class extends core.Lib.Mix(core.Entity).with(
    core.Mixin.TagMethods, core.Mixin.TextMethods, core.Mixin.MarkupMethods, core.Mixin.AttrMethods) {

    static type = 'preformatted'
    static defaultState = {
      tag    : 'pre',
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
  }
}
