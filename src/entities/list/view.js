export default function(core) {
  // List view
  return class extends core.View {
    build(state) {
      const buildList = (tag, attrs, items) => {
        let children = [];

        items.forEach((item) => {
          l('item', item)
          let vitem;

          if (item.items.length > 0) {
            let a = [
              this.vtext(item.text),
              buildList(tag, item.attrs, item.items)
            ]
            vitem = this.vnode('li', item.attrs, a);
          } else {
            // Build item without children
            // TODO: Add markup here
            vitem = this.vnode('li', item.attrs, [ this.vtext(item.text) ]);
          }

          children.push(vitem);
        })

        return this.vnode(tag, attrs, children);
      }

      return buildList(state.tag, state.attrs, state.items)
    }
  }
}
