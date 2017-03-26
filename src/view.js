import {VNode, VText} from './vdom/index.js'
import SegmentCalculator from './segments/segment_calculator.js'
import VTreeBuilder from './segments/vtree_builder.js'

// View abstract class
// Note: this class cannot be instantiated directly
export default class {
  constructor() {
    this.vnode = VNode
    this.vtext = VText
  }

  // Обрамить разметкой `markup` текст `text`.
  // Возвращает массив виртуальных нод.
  buildMarkup(text, markup, lineBreaks = []) {
    const sc = new SegmentCalculator(text, markup, lineBreaks)
    const vtb = new VTreeBuilder(this.vnode, this.vtext)

    return vtb.build(sc.calculate())
  }

  render(entity) {
    return this.build(entity)
  }
}
