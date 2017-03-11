export default function(core) {
  // List view
  return class extends core.View {
    build(grid) {
      this.vnode = core.VDOM.VNode
      this.vtext = core.VDOM.VText

      const columns = grid.state.columns.map((column) => {
        return new this.vnode(column, { attributes: column.state.attrs }, [])
      });

      return new this.vnode(grid, { attributes: grid.state.attrs }, columns);
    }
  }
}
