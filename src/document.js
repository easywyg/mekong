import Entity from './entity.js';
import UndoManager from './undo_manager.js';
import Policy from './document_policy.js';

// Commands
// TODO: Эти команды должны использоваться внутри сущностей.
// У документа тоже должна быть полиси
import InsertCommand from './commands/insert.js';
import RemoveCommand from './commands/remove.js';
import MoveCommand from './commands/move.js';
import ReplaceCommand from './commands/replace.js';

// A Document
// TODO: По идее даже документ может быть чем-то вроде сущности и возможно что у него
// тоже должна быть Policy
// Particle должен быть тоже чем-то вроде сущности.
// Как все это сделать? Запилисть миксин с методами, которые будут определять что это сущность
// и подмешивать его везде где надо?
//
// При попытке перемещения одной сущности в другую при помощи метода Document#transfer,
// та сущность, в которую перемещаем, должна проверять, может ли она принять передаваемую сущность.
export default class extends Entity {
  static type = 'document'
  static defaultState = {
    // Список сущностей не содержит вложенностей. Какая-сущность внутри какой находится,
    // определяется свойством container у сущности.
    entities: []
  }

  constructor(core, root) {
    super()

    this.undoManager = new UndoManager
    this.core = core
    this.node = root
  }

  get policy() {
    return new (Policy(this.core))
  }

  // Insert Entity into Document
  insert(entity) {
    if (!this.policy.canAppend(entity)) {
      return false
    }

    this.state.entities.push(entity)

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
        this.core.VDOM.patch(entity.node, entity.vtree);
      }
    }

    // Insert entity into DOM first time
    entity.vtree = entity.view.render(entity)
    entity.node = this.core.VDOM.create(entity.vtree, { document: this.node.ownerDocument })
    //entity.node = this.root.appendChild(
    //  this.core.VDOM.create(this.entity.vtree, { document: this.root.ownerDocument })
    //)

    this.undoManager.execute(
      new InsertCommand(this, entity)
      //new InsertCommand(this.core, this.node, entity)
    )

    return entity
  }
/*
  // Remove specified entity
  // У Particle должен быть свой метод для удаления, а чистые Entity
  // удаляем при помощи этого метода. Тут надо подумать короч.
  remove(entity) {
    if (entity.policy.canBeRemoved()) {
      this.undoManager.execute(
        new RemoveCommand(this.core, this.root, entity)
      )
    }
  }

  // TODO: Need to complete
  // Move entity into containerEntity before beforeEntity
  move(entity, containerEntity, beforeEntity) {
    // && anotherEntity.container.policy.canAppend(entity)
    if (entity.policy.canBeMoved(containerEntity, beforeEntity)) {
      this.undoManager.execute(
        new MoveCommand(this.root, entity, containerEntity, beforeEntity)
      )
    }
  }

  // TODO: Need to complete
  // Replace one entity with anotherEntity
  replace(entity, anotherEntity) {
    if (entity.policy.canBeReplaced(anotherEntity)) {
      this.undoManager.execute(
        new ReplaceCommand(entity, anotherEntity)
      )
    }
  }
*/
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
