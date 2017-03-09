// Глобальная история изменений
// ИМХО: у сущности не надо делать свою историю изменений, ибо сложно и нафиг не надо.
// будем хранить слепки entities.
export default class {
  constructor() {
    this.pages = [{
      // Список entities на странице
      entities: [],

      // Счетчик изменений. При изменении состояния любого Entity из списка entities,
      // этот счетчик должен увеличиваться.
      changes: 0
    }]

    this.currentPage = 0
  }

  // Добавляем страницу, когда меняется количество или порядок Entities.
  // На каждой странице будет свой список Entities.
  // У каждого Entity есть своя история изменений.
  addPage() {
    pages.push({ entities: [], changes: 0 })
    this.currentPage++
  }

  // Получить текущую страницу
  getCurrentPage() {
    return this.pages[this.currentPage]
  }

  canUndo() {
    return this.pages.length > 0 && this.getCurrentPage().changes > 0
  }

  canRedo() {
    // todo
  }

  undo() {
    const page = this.getCurrentPage()

    if (page.changes > 0) {

    }
  }

  redo() {
    // todo
  }
}
