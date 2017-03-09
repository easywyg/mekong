import Command from '../undo_manager/command.js';
import RemoveCommand from './remove.js';
import {create} from 'virtual-dom';

// InsertCommand
export default class extends Command {
  constructor(root, entity) {
    super()

    this.root = root
    this.entity = entity
  }

  execute() {
    this.entity.vtree = this.entity.view.render(this.entity.state)
    this.entity.node = this.root.appendChild(
      create(this.entity.vtree, { document: this.root.ownerDocument })
    )
  }

  undo() {
    (new RemoveCommand(this.root, this.entity)).execute()
  }
}
