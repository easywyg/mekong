import Command from '../undo_manager/command.js';
import RemoveCommand from './remove.js';

// InsertCommand
export default class extends Command {
  constructor(core, root, entity) {
    super()

    this.core = core
    this.root = root
    this.entity = entity
  }

  execute() {
    this.entity.vtree = this.entity.view.render(this.entity)

    this.entity.node = this.root.appendChild(
      this.core.VDOM.create(this.entity.vtree, { document: this.root.ownerDocument })
    )

    this.entity.changeState()
  }

  undo() {
    (new RemoveCommand(this.core, this.root, this.entity)).execute()
  }
}
