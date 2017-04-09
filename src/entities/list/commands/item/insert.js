import Command from 'undo_manager/command.js';

export default class extends Command {
  constructor(item) {
    super()

    this.item = item
    this.list = this.item.list
    this.doc  = this.list.document
    this.newItem = null
    this.removedItemId = null
  }

  // Вставка нового элемента списка
  execute() {
    if (!this.item.reference) {
      this.item.reference = this.list.state.items
    }

    this.newItem = new this.item.constructor(
      this.item.cloneDefaultState(), this.list
    )

    // Добавляем новый item entity в текущий уровень
    this.item.reference.push(this.newItem)
    this.newItem.reference = this.newItem.state.items

    // Ссылка на документ
    this.newItem.document = this.doc

    // Обновляем список сущностей
    this.doc.add(this.newItem)

    // Синхронизация состояния
    this.list.changeState()

    return true
  }

  // Отмена вставки нового элемента списка (т.е. удаление)
  undo() {
    const removeEntry = (items) => {
      items.forEach((item, i) => {
        let found = [
          item.state.text == this.newItem.state.text,
          item.state.attrs == this.newItem.state.attrs,
          item.state.markup == this.newItem.state.markup
        ].every((value) => { return value == true })

        if (found) {
          this.removedItemId = items[i].id
          delete items[i]
        } else if (item.state.items.length > 0) {
          removeEntry(item.state.items)
        }
      })
    }

    removeEntry(this.newItem.list.state.items)
    this.doc.remove(this.removedItemId)
    this.newItem.list.changeState()

    return true
  }

  // Восстановление элемента списка после удаления
  redo() {
    const item = this.newItem.constructor(
      this.newItem.state, this.list
    )

    item.reference = this.item.reference

    // Ссылка на документ
    item.document = this.doc
    item.id = this.removedItemId

    // Добавляем новый item entity в текущий уровень
    item.reference.push(this.newItem)
    this.newItem.reference = this.newItem.state.items

    // Обновляем список сущностей
    this.doc.state.entities.push(item)

    // Синхронизация состояния
    this.list.changeState()

    return true
  }
}
