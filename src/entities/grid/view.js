export default function(core) {
  // List view
  return class extends core.View {
    // TODO: Из-за того, что все рендерится кучей, тут не понятно как привязывать
    // отрендеренный элемент к его entity. А привязывать нужно, чтобы потом управлять им.
    // Пока привязыватются только Entity первого уровня.
    // Можно написать свою реализацию vdom, где при рендеринге все будет автоматом привязываться.
    //
    // this.vnode(column, children)
    build(grid) {
      this.vnode = core.VDOM.VNode
      this.vtext = core.VDOM.VText

      const columns = grid.state.columns.map((column) => {
        return new this.vnode(column, { attributes: column.state.attrs }, [])
      });

      //console.log('columns', columns)

      return new this.vnode(grid, { attributes: grid.state.attrs }, columns);
    }
  }
}
