//import Particle from '../particle';

// TODO
// дефолтный representation для сущности
// можно хранить в отдельном файле. Сама сущность хранится в отдельной дире
// со всеми зависимости. Есть файл export.js, в котором экспортируется сущность и все ее
// зависимости.

export default function(core) {
  return class Item extends core.Particle {
    constructor(items, list) {
      super();

      this.items = items;
      this.list  = list;
      this.state = {};
    }

    // TODO: Добавление нужно делать при помощи операции
    addItem(state) {
      state.items = []

      this.items.push(state);

      let item = new Item(state.items, this.list);
      item.state = state;

      // Touch state.items to rerender
      this.list.state.items = this.list.state.items

      return item;
    }

    // TODO: Merge attrs & markup
    // TODO: Обновление нужно делать при помощи операции
    update(newState) { // text, attrs = {}, markup = []
      this.state.text = newState.text;
      this.list.render();

      return null; // TODO
    }

    // TODO: Удаление нужно делать при помощи операции
    remove() {
      const removeEntry = (items) => {
        items.forEach((item, i) => {
          let found = [
            item.text == this.state.text,
            item.attrs == this.state.attrs,
            item.markup == this.state.markup
          ].every((value) => { return value == true });

          if (found) {
            delete items[i]
          } else if (item.items.length > 0) {
            removeEntry(item.items)
          }
        })
      }

      removeEntry(this.list.state.items)

      // Touch state.items to rerender
      this.list.state.items = this.list.state.items

      return null
    }
  }
}
