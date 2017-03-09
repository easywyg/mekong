import UndoManager from './undo_manager.js';

// Entities collection
export default class {
  constructor() {
    // Список сущностей не содержит вложенностей. Какая-сущность внутри какой находится,
    // определяется свойством container у сущности.
    this.entities = []
    this.undoManager = new UndoManager
  }

  add(entity) {
    this.entities.push(entity)

    // При при изменении состояния сущности
    // записываем обновленное состояние в undoManager
    entity.onStateChange = (command) => {
      l(command)
      this.undoManager.execute(command)
    }

    return entity
  }
}
