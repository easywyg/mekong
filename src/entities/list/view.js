export default function(core) {
  // List view
  return class extends core.View {
    build(list) {
      this.vnode = core.VDOM.VNode
      this.vtext = core.VDOM.VText

      const buildList = (a_list, attrs, items) => {
        let children = []

        items.forEach((item) => {
          let vitem

          if (item.state.items.length > 0) {
            let a = [
              new this.vtext(item.state.text),
              buildList(a_list, item.state.attrs, item.state.items)
            ]

            vitem = new this.vnode(item, item.state.attrs, a);
          } else {
            // Build item without children
            // TODO: Add markup here
            vitem = new this.vnode(item, item.state.attrs, [ new this.vtext(item.state.text) ])
          }

          children.push(vitem)
        })

        return new this.vnode(a_list, attrs, children);
      }

      return buildList(list, list.state.attrs, list.state.items)
    }
  }
}
