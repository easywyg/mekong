export default function(core) {
  // List view
  return class extends core.View {
    build(entity) {
      this.vnode = core.VDOM.VNode
      this.vtext = core.VDOM.VText

      const children = this.buildMarkup(entity.state.text, entity.state.markup)
      return new this.vnode(entity, { attributes: entity.state.attrs }, children)
    }
  }
}
