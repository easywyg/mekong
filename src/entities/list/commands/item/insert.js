import Command from '../../../../undo_manager/command.js';

export default class extends Command {
  constructor(item) {
    super()

    this.item = item
    this.newItem = null
    this.removedItem = null
  }

  execute() {
    if (!this.item.reference) {
      this.item.reference = this.item.list.state.items
    }

    this.newItem = new this.item.constructor(
      this.item.cloneDefaultState(), this.item.list
    )

    // Добавляем новый item entity в текущий уровень
    this.item.reference.push(this.newItem)
    this.newItem.reference = this.newItem.state.items

    // Синхронизация состояния
    this.newItem.list.changeState()

    return true
  }

  undo() {
    //return true
    const removeEntry = (items) => {
      items.forEach((item, i) => {
        let found = [
          item.state.text == this.newItem.state.text,
          item.state.attrs == this.newItem.state.attrs,
          item.state.markup == this.newItem.state.markup
        ].every((value) => { return value == true })

        if (found) {
          this.removedItem = items[i]
          delete items[i]
        } else if (item.state.items.length > 0) {
          removeEntry(item.state.items)
        }
      })
    }

    removeEntry(this.newItem.list.state.items)
    this.newItem.list.changeState()

    return true
  }

  redo() {
    //this.item = this.removedItem
    //return this.execute()
    //return true
    //l('restore item')
    const newItem = this.newItem.constructor(
      this.newItem.state, this.newItem.list
    )

    newItem.reference = this.item.reference
    this.removedItem = newItem
    this.item = this.removedItem

    return this.execute()
    //return (new this.constructor(newItem)).execute()
  }
}
