import View from '../view';
import VdomBuilder from '../segments/vdom_builder';

// A Table View
export default class extends View {
  buildMarkup(text, markup) {
    let tagger = new VdomBuilder(text, markup);
    return tagger.process()
  }

  build(entity) {
    let thead = this.vnode('thead', {});
    let tbody = this.vnode('tbody', {}, []);
    let table = this.vnode('table', { attributes: entity.opts.attrs.table }, []);

    // Set table caption if needed
    if (entity.opts.caption.length > 0) {

      let caption = this.vnode('caption', { attributes: entity.opts.attrs.caption },
        this.buildMarkup(entity.opts.caption, entity.opts.markup)
      );

      table.children.push(caption);
    }

    table.children.push(tbody);

    let rows = [];
    entity.opts.data.forEach((entry) => {
      let row = this.vnode('tr', {}, []);

      entry.forEach((cell) => {
        row.children.push(
          this.vnode(cell.meta.tag, { attributes: cell.meta.attrs },
            this.buildMarkup(cell.text, cell.markup)
          )
        );
      });

      tbody.children.push(row);
    });

    return table;
  }
}

