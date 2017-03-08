export default function(core) {
  // List view
  return class extends core.View {
    build(state) {
      if (state.text.length > 0) {
        // TODO: Cache built markup, do not rebuild if not changed
        const children = this.buildMarkup(state.text, state.markup);
        return this.vnode(state.tag, { attributes: state.attrs }, children)
      } else {
        return null
      }
    }
  }
}
