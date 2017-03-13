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

    this.add(entity)

    // Run command
    entity.onCommand = (command, execCommandItself) => {
      // Run command without putting it in undoManager history
      if (execCommandItself) {
        return command.execute()
      }
      // Run command and put it into history to make undo/redo in the future
      else {
        return this.undoManager.execute(command)
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
    entity.core = this.core
    entity.document = this
    entity.vtree = entity.view.render(entity)
    entity.node = this.core.VDOM.create(entity.vtree, {
      document: this.node.ownerDocument
    })

    this.undoManager.execute(new this.core.Command.Insert(this, entity))

    return entity
  }

  // Find entity by id
  find(entityId) {
    return this.state.entities.find((entity) => {
      return entity.id == entityId
    })
  }

  // Add entity to state.entities
  add(entity) {
    this.state.entities.push(entity)
  }

  // Remove entity from state.entities by its ID
  remove(entityId) {
    const index = this.state.entities.findIndex((entity) => {
      return entity.id == entityId
    })

    if (index != -1) {
      delete this.state.entities[index]
      return true
    }

    return false
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
