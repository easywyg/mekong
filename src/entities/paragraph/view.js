export default function(core) {
  // List view
  return class extends core.View {
    build(state) {
      const children = this.buildMarkup(state.text, state.markup);
      return this.vnode(state.tag, { attributes: state.attrs }, children)
    }
  }
}
