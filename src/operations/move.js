import Operation from '../operation';

// A Move Operation
export default class extends Operation {
  constructor(entity, beforeEntity = null) {
    super();

    this.entity = entity;
    this.beforeEntity = beforeEntity;
  }

  get type() {
    return 'move'
  }

  // Переместить entity после beforeEntity.
  // Если beforeEntity не указан (null), то entity будет перемещен
  // в самое начало списка entities.
  execute(entities) {
    entities.entities.splice(this.beforeEntity.index, 0, this.entity);

    // Переносим ноду
    this.entity.node.parentNode.insertBefore(this.entity.node, this.beforeEntity.node);

    // Обновляем индекс у всех entities
    entities.entities.map((entity, index) => {
      entity.index = index;
      return entity;
    })

    // Нужно ли пеперендеривать?
    return null;
  }

  reverse(entities) {
    // Если операция помечена как неоткатываемая, выходим
    if (!this.reversible) {
      return false;
    }

    const operation = new _class(this.beforeEntity.node, this.entity);
    return operation.execute(entities);
  }
}
