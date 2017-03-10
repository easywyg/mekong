import UndoManager from './undo_manager.js';
import {diff, patch} from 'virtual-dom';

import InsertCommand from './commands/insert.js';
import RemoveCommand from './commands/remove.js';
import MoveCommand from './commands/move.js';

// A Document
export default class {
  constructor(root) {
    // Список сущностей не содержит вложенностей. Какая-сущность внутри какой находится,
    // определяется свойством container у сущности.
    this.entities = []
    this.undoManager = new UndoManager
    this.root = root
  }

  // Insert Entity into Document
  insert(entity) {
    this.entities.push(entity)

    // При при изменении состояния сущности
    // записываем обновленное состояние в undoManager
    // А так же обновляем сущность в DOM
    entity.onStateChange = (command, execCommandItself) => {
      //l('onStateChange', command)

      if (execCommandItself) {
        command.execute()
      } else {
        this.undoManager.execute(command)
      }

      // Update DOM node
      if (entity.node) {
        l(entity.state)
        entity.vtree = diff(entity.vtree, entity.view.render(entity.state))
        entity.node = patch(entity.node, entity.vtree);
      }
      // Create DOM node
      else {
        this.undoManager.execute(
          new InsertCommand(this.root, entity)
        )
      }
    }

    return entity
  }

  // Remove specified entity
  remove(entity) {
    this.undoManager.execute(
      new RemoveCommand(this.root, entity)
    )
  }

  // Move entity before anotherEntity
  move(entity, anotherEntity) {
    this.undoManager.execute(
      // TODO: Need to complete
      new MoveCommand(this.root, entity, anotherEntity)
    )
  }

  canUndo() {
    return this.undoManager.canUndo()
  }

  canRedo() {
    return this.undoManager.canRedo()
  }

  undo() {
    if (this.canUndo()) {
      this.undoManager.undo()
    }
  }

  redo() {
    if (this.canRedo()) {
      this.undoManager.redo()
    }
  }
}
