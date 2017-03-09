import UndoManager from './undo_manager.js';
import {diff, patch, create} from 'virtual-dom';

// Entities collection
export default class {
  constructor(root) {
    // Список сущностей не содержит вложенностей. Какая-сущность внутри какой находится,
    // определяется свойством container у сущности.
    this.entities = []
    this.undoManager = new UndoManager
    this.root = root
  }

  // TODO: Именно тут нужно добавлять entity в DOM
  add(entity) {
    this.entities.push(entity)

    // При при изменении состояния сущности
    // записываем обновленное состояние в undoManager
    // А так же обновляем сущность в DOM
    entity.onStateChange = (command, execCommandItself) => {
      l('onStateChange', command)
      if (execCommandItself) {
        command.execute()
      } else {
        this.undoManager.execute(command)
      }

      // Update DOM node
      if (entity.node) {
        //l('upd', entity.state)
        entity.vtree = diff(entity.vtree, entity.view.render(entity.state))
        //l(entity.vtree)
        entity.node = patch(entity.node, entity.vtree);
      }
      // Create DOM node
      else {
        //l('create')
        entity.vtree = entity.view.render(entity.state)
        entity.node = this.root.appendChild(
          create(entity.vtree, { document: this.root.ownerDocument })
        )
      }
    }

    return entity
  }

  remove(entity) {

  }

  move(entity) {

  }
}
