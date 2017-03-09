import UndoManager from './undo_manager.js';
import {diff, patch} from 'virtual-dom';

import InsertCommand from './commands/insert.js';
import RemoveCommand from './commands/remove.js';
import MoveCommand from './commands/move.js';

// A Document
// TODO: Возможно надо переименовать этот класс в Document, если массив
// entities нам не пригодится!
export default class {
  constructor(root) {
    // Список сущностей не содержит вложенностей. Какая-сущность внутри какой находится,
    // определяется свойством container у сущности.
    this.entities = []
    this.undoManager = new UndoManager
    this.root = root
  }

  // TODO: Именно тут нужно добавлять entity в DOM
  insert(entity) {
    this.entities.push(entity)

    // При при изменении состояния сущности
    // записываем обновленное состояние в undoManager
    // А так же обновляем сущность в DOM
    entity.onStateChange = (command, execCommandItself) => {
      //l('onStateChange', command)

      // TODO: Во всех командах параграфа реализовать метод redo()
      if (execCommandItself) {
        command.execute()
      } else {
        this.undoManager.execute(command)
      }

      // Update DOM node
      if (entity.node) {
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
      new MoveCommand(this.root, entity, anotherEntity)
    )
  }
}
