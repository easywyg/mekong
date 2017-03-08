export default function(core) {
  return class Item extends core.Particle {
    constructor(items, list) {
      super();

      this.items = items;
      this.list = list;
      this.itemEntry = {};
    }

    // TODO: Добавление нужно делать при помощи операции
    addRow(attrs) {
      
    }

    // TODO: Удаление нужно делать при помощи операции
    remove() {
      this.list.render()
      return null
    }
  }
}
