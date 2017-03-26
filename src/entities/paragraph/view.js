import SegmentCalculator from '../../segments/segment_calculator.js'
import VTreeBuilder from '../../segments/vtree_builder.js'
import VTreeListBuilder from '../../segments/vtree_list_builder.js'

export default function(core) {
  // List view
  return class extends core.View {
    buildMarkup(text, markup) {
      //let tagger = new VdomBuilder(text, markup, this.vnode, this.vtext)
      //return tagger.process()
      //
      //
      this.vnode = core.VDOM.VNode
      this.vtext = core.VDOM.VText

      const sc = new SegmentCalculator(text, markup, [])
      const vtb = new VTreeBuilder(this.vnode, this.vtext)
      const vtlb = new VTreeListBuilder(sc, vtb)
      const result = vtlb.build()
      //console.log(result)
      return result
    }

    build(entity) {
      this.vnode = core.VDOM.VNode
      this.vtext = core.VDOM.VText

      //console.log('child', this.buildMarkup(entity.state.text, entity.state.markup))

      const children = this.buildMarkup(entity.state.text, entity.state.markup)
      console.log('children',children)
      return new this.vnode(entity, { attributes: entity.state.attrs }, children)
    }
  }
}
