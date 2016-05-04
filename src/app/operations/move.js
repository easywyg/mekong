import Operation from '../operation.js';

// A Move Operation
export default class extends Operation {
  constructor(entity, anotherEntity = null, pos = 'after') {
    super();

    this.entity = entity;
    this.anotherEntity = anotherEntity;
  }

  get type() {
    return 'move'
  }

  // Переместить entity после anotherEntity.
  // Если anotherEntity не указан (null), то entity будет перемещен
  // в самое начало списка entities.
  execute(entities) {
    if (this.anotherEntity == null) {
      entities.entities.splice(0, 0, this.entity);
    } else {
      entities.entities.splice(this.anotherEntity.index, 0, this.entity);
    }

    // Переносим ноду
    this.entity.node.appendAfter(this.anotherEntity.node)

    // Обновляем индекс у всех entities
    entities.entities.map((entity, index) => {
      entity.index = index;
    })

    this.entity.modified = true;

    // Нужно ли пеперендеривать?
    return entities.render();
  }
}
