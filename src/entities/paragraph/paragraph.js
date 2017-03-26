import View   from './view.js';
import Policy from './policies/paragraph.js';

export default function(core) {
  // A Paragraph Entity
  return class extends core.Lib.Mix(core.Entity).with(
    core.Mixin.TagMethods, core.Mixin.TextMethods, core.Mixin.MarkupMethods, core.Mixin.AttrMethods) {

    static type = 'paragraph'
    static defaultState = {
      tag        : 'p',
      text       : '',
      start      : null,
      end        : null,
      attrs      : {},
      markup     : [],
      lineBreaks : []
    }

    get view() {
      return new (View(core))
    }

    get policy() {
      return new (Policy(core))(this)
    }
  }
}
