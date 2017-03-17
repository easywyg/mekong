import Entity from './entity.js';
import UndoManager from './undo_manager.js';
import Policy from './document_policy.js';

// A Document
export default class extends Entity {
  static type = 'document'
  static defaultState = {
    // Список сущностей не содержит вложенностей. Какая-сущность внутри какой находится,
    // определяется свойством parentEntity у сущности.
    entities: []
  }

  constructor(core, root) {
    super()

    const self = this

    this.undoManager = new UndoManager
    this.core = core
    this.node = root
  }

  get policy() {
    return new (Policy(this.core))
  }

  // Find entity by id
  find(entityId) {
    return this.state.entities.find((entity) => {
      return entity.id == entityId
    })
  }

  // Find entity index by its id
  findIndex(entityId) {
    return this.state.entities.findIndex((entity) => {
      return entity.id == entityId
    })
  }

  // Insert Entity into Document
  insert(entity) {
    const command = new this.core.Command.Document.Insert(this, this, entity)

    if (this.undoManager.execute(command)) {
      return entity
    }

    return null
  }

  // Remove entity from state.entities by its ID
  remove(entity) {
    const command = new this.core.Command.Document.Remove(this, entity)
    return this.undoManager.execute(command)
  }

  // Move entity before another entity. If beforeEntity is null, then just transfer
  // entity into containerEntity
  move(entity, beforeEntity, containerEntity) {
    const command = new this.core.Command.Document.Move(this, entity, beforeEntity, containerEntity)
    return this.undoManager.execute(command)
  }

  // Replace entity with withEntity
  replace(entity, withEntity) {
    const command = new this.core.Command.Document.Remove(this, entity, withEntity)
    return this.undoManager.execute(command)
  }

  // Remove all entities
  // NOTE: Эта команда неоткатываемая. Оставить так или поправить?
  /*removeAll() {
    this.state.entities.forEach((entity) => {
      this.remove(entity)
    })
  }*/

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
