import Operation from '../operation';
import TransferOperation from '../operations/transfer';
import DeleteOperation from '../operations/delete';

// Entities
//import EmbedEntity from '../entities/embed';
//import GridEntity from '../entities/grid';
//import GridColumnEntity from '../entities/grid_column';
//import ImageEntity from '../entities/image';
//import ListEntity from '../entities/list';
import ParagraphEntity from '../entities/paragraph';
import RootContainerEntity from '../entities/root_container';
//import SubstrateEntity from '../entities/substrate';
//import TableEntity from '../entities/table';

const EntityMap = {
  //Embed         : EmbedEntity,
  //Grid          : GridEntity,
  //GridColumn    : GridColumnEntity,
  //Image         : ImageEntity,
  //List          : ListEntity,
  Paragraph     : ParagraphEntity,
  RootContainer : RootContainerEntity,
  //Substrate     : SubstrateEntity,
  //Table         : TableEntity
};

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
    this.entity = null; // Созданный entity
    this._rollback = {};

    // При инициализации операции нужно назначать ей ID
  }

  get type() {
    return 'insert'
  }

  execute(entities) {
    const klass = EntityMap[this.entityName];

    try {
      this.entity = new klass;
    } catch (e) {
      if (e.name == 'TypeError') {
        throw new Error(`Cannot find entity with name ${this.entityName}!`)
      }
    }

    const length = entities.entities.push(this.entity);

    this.entity.options = this.opts;
    this.entity.index = length - 1;
    entities.render();

    // Вставка в контейнер
    const transfer = new TransferOperation(this.entity, this.container);
    transfer.execute(entities);

    this._rollback.entity = this.entity;

    return this.entity;
  }

  // Чтобы выполнить противоположное действие, команда должна
  // знать, что было сделано.
  // Здесь есть фишка. Выполняемая команда в методе rollback не должна
  // записывать данные внутри себя для отката команды, иначе будет бесконечный цикл.
  // Нужен какой-то флаг, который пометит вновь созданную операцию как неоткатываемую.
  rollback(entities) {
    const operation = new DeleteOperation(this._rollback.entity);
    operation.execute(entities);

    return null;
  }
}
