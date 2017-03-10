// Commands
import InsertItemCommand from '../commands/insert_item.js';

export default function(core) {
  return class extends core.Lib.Mix(core.Particle).with(
    core.Mixin.TextMethods, core.Mixin.MarkupMethods, core.Mixin.AttrMethods) {

    static defaultState = {
      items: [],
      text: '',
      start: null,
      end: null,
      markup: [],
      attrs: {}
    }

    // TODO: тут надо сделать наподобие как в Entity
    constructor(items, entity) {
      super();

      this.items = items;
      this.entity = entity;
      this.onStateChange = this.entity.onStateChange
    }

    createItem() {
      const command = new InsertItemCommand(this)
      this.entity.onStateChange(command)

      return command.item
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
