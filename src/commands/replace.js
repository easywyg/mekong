import Command from '../undo_manager/command.js';

// ReplaceCommand
export default class extends Command {
  constructor(entity, replacement) {
    super()

    this.entity = entity
    this.replacement = replacement
    this.parent = this.entity.node.parentNode
    this.state = Object.assign({}, this.entity.state)
  }

  execute() {
    // Move replacement near entity
    this.replacement.node = this.parent.insertBefore(
      this.replacement.node, this.entity.node
    )

    this.replacement.parentEntity = this.entity.parentEntity

    // Remove entity
    this.parent.removeChild(this.entity.node)
    this.entity.node = null
    this.entity.vtree = null
    this.entity.parentEntity = null

    this.replacement.changeState()
    return true
  }

  undo() {
    this.entity.vtree = this.entity.view.render(this.entity)
    this.entity.node = this.entity.core.VDOM.create(this.entity.vtree, {
      document: this.replacement.node.ownerDocument
    })

    this.entity.node = this.parent.appendChild(this.entity.node)

    const command = new this.constructor(
      this.replacement, this.entity
    )

    return this.replacement.runCommand(command, true)
  }

  redo() {
    this.replacement.vtree = this.replacement.view.render(this.replacement)
    this.replacement.node = this.replacement.core.VDOM.create(this.replacement.vtree, {
      document: this.entity.node.ownerDocument
    })

    this.replacement.node = this.parent.appendChild(this.replacement.node)
    return this.execute()
  }
}
