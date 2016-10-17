import View from '../view';
import VdomBuilder from '../segments/vdom_builder';

// A Table View
export default class extends View {
  buildMarkup(text, markup) {
    let tagger = new VdomBuilder(text, markup);
    return tagger.process()
  }

  build() {
    let tbody = this.vnode('tbody', {}, []);
    let table = this.vnode('table', { attributes: this.entity.options.attrs.table }, []);

    // Set table caption if needed
    if (this.entity.options.caption.length > 0) {
      let caption = this.vnode('caption', { attributes: this.entity.options.attrs.caption },
        this.buildMarkup(this.entity.options.caption, this.entity.options.markup)
      );

      table.children.push(caption);
    }

    table.children.push(tbody);

    return table;
  }
}

