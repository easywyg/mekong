import Operation from '../operation.es6';
import InsertOperation from '../operations/insert.es6';

// A Delete Operation
export default class extends Operation {
  constructor(entity) {
    super();

    this.entity = entity;
  }

  get type() {
    return 'delete'
  }

  // Удалить указанный entity
  execute(entities) {
    if (this.reversible) {
      this.deletedEntity = entity.clone(); // Clone
    }

    entities.entities.splice(this.entity.index, 1);

    // Обновляем индекс у всех entities
    entities.entities.map((entity, index) => {
      entity.index = index;
    })

    this.entity.modified = true;
    this.entity.index = null;

    // Помечена как удаленная. entity.render должен удалить такую помеченную сущность
    this.entity.deleted = true;

    return entities.render();
  }

  reverse(entities) {
    // Если операция помечена как неоткатываемая, выходим
    if (!this.reversible) {
      return false;
    }

    const operation = new InsertOperation(
      entityName, this.deletedEntity.opts, this.deletedEntity.container
    );

    return operation.execute(entities);
  }
}
