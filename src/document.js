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

  constructor(usedEntitities, core, root) {
    super(core, root)

    const self = this

    this.undoManager = new UndoManager
    this.usedEntitities = usedEntitities
    this.core = core
    this.node = root

    //console.log('core', this.core)
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

  create(name, options, insertPos) {
    const klass = this.usedEntitities[name.toLowerCase()](this.core)
    const entity = new klass(options)
    const command = new this.core.Command.Document.Create(this, this, entity, insertPos)

    if (this.undoManager.execute(command)) {
      return entity
    }

    return null
  }

  // Mutate entity to another type of entity
  mutate(entity, entityType, tag, attrs) {
    const command = new this.core.Command.Document.Mutate(this, entity, entityType, tag, attrs)
    return this.undoManager.execute(command)
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

  // Split entity into two entities
  split(entity, position) {
    const command = new this.core.Command.Document.Split(this, entity, position)
    if (this.undoManager.execute(command)) {
      return command.newParagraph
    }

    return null
  }

  // Join two entities into one
  join(entity, withEntity) {
    const command = new this.core.Command.Document.Join(this, entity, withEntity)
    if (this.undoManager.execute(command)) {
      return command.entity
    }

    return null
  }

  lineBreak(entity, position) {
    const command = new this.core.Command.Document.LineBreak(this, entity, this)
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

  // Load JSON and render document
  load() {

  }

  // Render document state into HTML
  html() {

  }
}
