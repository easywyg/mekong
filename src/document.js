import UndoManager from './undo_manager.js';
import InsertCommand from './commands/insert.js';
import RemoveCommand from './commands/remove.js';
import MoveCommand from './commands/move.js';

// A Document
// TODO: По идее даже документ может быть чем-то вроде сущности и возможно что у него
// тоже должна быть Policy
// Particle должен быть тоже чем-то вроде сущности.
// Как все это сделать? Запилисть миксин с методами, которые будут определять что это сущность
// и подмешивать его везде где надо?
//
// При попытке перемещения одной сущности в другую при помощи метода Document#transfer,
// та сущность, в которую перемещаем, должна проверять, может ли она принять передаваемую сущность.
export default class {
  constructor(core, root) {
    // Список сущностей не содержит вложенностей. Какая-сущность внутри какой находится,
    // определяется свойством container у сущности.
    this.entities = []
    this.undoManager = new UndoManager
    this.core = core
    this.root = root
  }

  // Insert Entity into Document
  insert(entity) {
    this.entities.push(entity)

    // Run command
    entity.onCommand = (command, execCommandItself) => {
      // Run command without putting it in undoManager history
      if (execCommandItself) {
        command.execute()
      }
      // Run command and put it into history to make undo/redo in the future
      else {
        this.undoManager.execute(command)
      }
    }

    // Update entity when it's state has changed
    entity.onStateChange = () => {
      // Update DOM node
      if (entity.node) {
        entity.vtree = this.core.VDOM.diff(entity.vtree, entity.view.render(entity))
        entity.node = this.core.VDOM.patch(entity.node, entity.vtree);
      }
    }

    // Insert entity into DOM
    this.undoManager.execute(
      new InsertCommand(this.core, this.root, entity)
    )

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

  // Transfer entity into anotherEntity
  transfer(entity, anotherEntity) {
    l(entity, anotherEntity)
    anotherEntity.node.appendChild(entity.node)
    // ...
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
