import Operation from '../operation';
import TransferOperation from '../operations/transfer';
import DeleteOperation from '../operations/delete';
import EntityMap from '../entity_map';

// A Insert Operation
export default class extends Operation {
  constructor(entityName, opts, container) {
    super();

    /*if (typeof container == 'undefined') {
      throw new Error('You should pass container option!');
    }*/

    this.entityName = entityName;
    this.opts = opts;
    this.container = container;
    this.insertedEntity = null; // Созданный entity

    // При инициализации операции нужно назначать ей ID
  }

  get type() {
    return 'insert'
  }

  execute(entities) {
    const klass = EntityMap[this.entityName];
    let entity;

    try {
      entity = new klass;
    } catch (e) {
      if (e.name == 'TypeError') {
        throw new Error(`Cannot find entity with name ${this.entityName}!`)
      }
    }

    const length = entities.entities.push(entity);

    entity.options = this.opts;
    entity.index = length;
    entities.render();

    // Вставка в контейнер
    const transfer = new TransferOperation(entity, this.container);
    transfer.execute(entities);

    // Записываем данные для отката операции
    if (this.reversible) {
      this.insertedEntity = entity; // Clone
    }

    return entity;
  }

  // Чтобы выполнить противоположное действие, команда должна
  // знать, что было сделано.
  // Здесь есть фишка. Выполняемая команда в методе reverse не должна
  // записывать данные внутри себя для отката команды, иначе будет бесконечный цикл.
  // Нужен какой-то флаг, который пометит вновь созданную операцию как неоткатываемую.
  reverse(entities) {
    // Если операция помечена как неоткатываемая, выходим
    if (!this.reversible) {
      return false;
    }

    const operation = new DeleteOperation(this.insertedEntity);

    // Данные для отката операции нужно запоминать во время вополнения метода execute.
    operation.reversible = false;
    return operation.execute(entities);
  }
}
