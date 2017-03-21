import Command from '../../undo_manager/command.js';
import RemoveCommand from './remove.js';

// CreateCommand
// Create one entity within another entity
export default class extends Command {
  constructor(doc, targetEntity, entity) {
    super()

    this.doc = doc
    this.targetEntity = targetEntity
    this.entity = entity
  }

  setCallbacks() {
    // Run command
    this.entity.onCommand = (command, execCommandItself) => {
      // Run command without putting it in undoManager history
      if (execCommandItself) { // TODO: Походу это больше не нужно
        return command.execute()
      }
      // Run command and put it into history to make undo/redo in the future
      else {
        return this.doc.undoManager.execute(command)
      }
    }

    // Update entity when it's state has changed
    this.entity.onStateChange = () => {
      // Update DOM node
      if (this.entity.node) {
        this.entity.vtree = this.doc.core.VDOM.diff(
          this.entity.vtree, this.entity.view.render(this.entity)
        )

        this.doc.core.VDOM.patch(this.entity.node, this.entity.vtree);
      }
    }
  }

  // Вставка нового entity в DOM
  execute() {
    if (!this.targetEntity.policy.canAppend(this.entity)) {
      return false
    }

    // Set callbacks
    this.setCallbacks()

    // Insert entity into DOM first time
    this.entity.core = this.doc.core
    this.entity.document = this.doc
    this.entity.vtree = this.entity.view.render(this.entity)
    this.entity.node = this.doc.core.VDOM.create(this.entity.vtree, {
      document: this.doc.node.ownerDocument
    })

    this.doc.state.entities.push(this.entity)

    this.entity.node = this.targetEntity.node.appendChild(this.entity.node)
    this.entity.parentEntity = this.targetEntity
    this.entity.changeState()
    return true
  }

  // Отмена вставки entity в DOM
  undo() {
    return (new RemoveCommand(this.doc, this.entity)).execute()
  }

  // Восстановление entity (отмена undo())
  redo() {
    this.entity.vtree = this.entity.view.render(this.entity)
    this.entity.node = this.entity.core.VDOM.create(this.entity.vtree, {
      document: this.targetEntity.node.ownerDocument
    })

    return this.execute()
  }
}
