import Command from '../../undo_manager/command.js';
import RemoveCommand from './remove.js';

// CreateCommand
// Create one entity within another entity
export default class extends Command {
  constructor(doc, targetEntity, entity, insertPos) {
    super()

    this.doc = doc
    this.targetEntity = targetEntity
    this.entity = entity
    this.insertPos = insertPos
  }

  setCallbacks() {
    // Run command
    this.entity.onCommand = (command) => {
      return this.doc.undoManager.execute(command)
    }

    // Update entity when it's state has changed
    this.entity.onStateChange = () => {
      if (!this.entity.node) return

      // Update DOM node
      const newTree = this.entity.view.render(this.entity)
      //console.log('update', newTree)
      const patches = this.doc.core.VDOM.diff(this.entity.vtree, newTree)
      this.entity.node = this.doc.core.VDOM.patch(this.entity.node, patches);
      this.entity.vtree = newTree
    }
  }

  // Вставка нового entity в DOM
  execute() {
    if (!this.targetEntity.policy.canAppend(this.entity)) {
      return false
    }

    // Insert entity into DOM first time
    this.entity.core = this.doc.core
    this.entity.document = this.doc
    this.entity.vtree = this.entity.view.render(this.entity)
    //console.log('create', this.entity.vtree)
    this.entity.node = this.doc.core.VDOM.create(this.entity.vtree, {
      document: this.doc.node.ownerDocument
    })

    this.doc.state.entities.push(this.entity)

    if (this.insertPos && (this.insertPos.after || this.insertPos.before)) {
      let refNode = null

      if (this.insertPos.after) {
        refNode = this.insertPos.after.node.nextSibling
      } else if (this.insertPos.before) {
        refNode = this.insertPos.before.node
      }

      this.entity.node = this.targetEntity.node.insertBefore(this.entity.node, refNode)
    } else {
      this.entity.node = this.targetEntity.node.appendChild(this.entity.node)
    }

    this.entity.parentEntity = this.targetEntity

    // Set callbacks
    this.setCallbacks()
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
