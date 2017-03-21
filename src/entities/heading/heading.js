import View   from './view.js';
import Policy from './policies/heading.js';

export default function(core) {
  // A Paragraph Entity
  return class extends core.Lib.Mix(core.Entity).with(
    core.Mixin.TagMethods, core.Mixin.TextMethods, core.Mixin.MarkupMethods, core.Mixin.AttrMethods) {

    static type = 'heading'
    static defaultState = {
      tag    : 'h1',
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
      return new (Policy(core))
    }
  }
}
