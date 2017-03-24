import merge from 'deepmerge';
import Command from '../../undo_manager/command.js';

// MutateCommand
export default class extends Command {
  constructor(doc, entity, entityType, tag, attrs = {}) {
    super()

    this.doc = doc
    this.entity = entity
    this.entityType = entityType.toLowerCase()
    this.tag = tag
    this.attrs = attrs
    this.oldType = this.entity.type
    this.oldTag = this.entity.state.tag
    this.oldAttrs = merge({}, this.entity.state.attrs)
    this.parent = this.entity.node.parentNode
    this.mutatedEntity = null
  }

  execute() {
    if (!this.entity.policy.canBeMutated(this.entityType)) {
      return false
    }

    if (!this.doc.usedEntitities[this.entityType]) {
      return false
    }

    // Создаем новую сущность и заменяем на нее текущую сущность
    const klass = this.doc.usedEntitities[this.entityType](this.doc.core)
    const entity = new klass({ tag: this.tag, attrs: this.attrs, markup: this.entity.state.markup })

    // Заменяем сущность в коллекции документа
    const index = this.doc.findIndex(this.entity.id)
    this.doc.state.entities.splice(index, 1, entity)

    // Указываем ссылку на ноду
    entity.id = this.entity.id
    entity.core = this.entity.core
    entity.document = this.entity.document
    entity.parentEntity = this.entity.parentEntity
    entity.state.text = this.entity.state.text
    entity.vtree = entity.view.render(entity)

    entity.node = this.parent.appendChild(this.doc.core.VDOM.create(entity.vtree, {
      document: this.entity.node.ownerDocument
    }))

    this.parent.replaceChild(entity.node, this.entity.node)
    this.mutatedEntity = entity

    return true
  }

  undo() {
    const command = new this.constructor(this.doc, this.mutatedEntity, this.oldType, this.oldTag, this.oldAttrs)
    const result = command.execute()

    this.mutatedEntity = command.mutatedEntity
    this.oldType = command.oldType
    this.oldTag = command.oldTag
    this.oldAttrs = command.oldAttrs

    return result
  }

  redo() {
    const command = new this.constructor(this.doc, this.mutatedEntity, this.oldType, this.oldTag, this.oldAttrs)
    return command.execute()
  }
}
