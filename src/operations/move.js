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
  execute() {
    // Если перемещаем ноду из одного контейнера в другой
    if (this.entity._container._id != this.beforeEntity._container._id) {
      this.beforeEntity._container.appendEntity(this.entity);
    }

    // Переносим ноду
    this.entity.node.parentNode.insertBefore(
      this.entity.node, this.beforeEntity.node
    );

    this.entity._container.swap(this.entity, this.beforeEntity);
    return this.entity;
  }

  rollback() {
    this.beforeEntity.moveBefore(this.entity);
    return null;
  }
}
