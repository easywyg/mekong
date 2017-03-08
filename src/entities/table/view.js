export default function(core) {
  // List view
  return class extends core.View {
    build(state) {
      // TODO: Надо рекурсивно построить виртуальный дом на основе представления
      return this.vnode('table', { attributes: state.attrs }, [
        this.buildCaption(state.caption),
        this.buildHead(state.head),
        this.buildBody(state.body)
      ].filter((x) => { return x !== null }));
    }

    buildCaption(caption) {
      if (caption.text.length == 0) {
        return null;
      }

      return this.vnode('caption', caption.attrs, [
        this.vtext(caption.text)
      ]);
    }

    buildHead(head) {
      if (head.length == 0) {
        return null;
      }

      let ths = [];
      head.forEach((column) => {
        let th = this.vnode('th', column.attrs, [
          this.vtext(column.text)
        ])

        ths.push(th);
      })

      return this.vnode('thead', {}, [
        this.vnode('tr', {}, ths)
      ]);
    }

    buildBody(body) {
      if (body.length == 0) {
        return null;
      }

      let rows = [];

      body.forEach((row) => {
        let tds = [];

        row.forEach((column) => {
          let td = this.vnode('td', column.attrs, [
            this.vtext(column.text)
          ])

          tds.push(td);
        })

        let tr = this.vnode('tr', {}, tds)
        rows.push(tr);
      });

      return this.vnode('tbody', {}, rows);
    }
  }
}
