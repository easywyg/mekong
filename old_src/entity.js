// Operations
/*
import InsertOperation from './operations/insert.js';
import UpdateOperation from './operations/update.js';
import ReplaceOperation from './operations/replace.js';
import MoveOperation from './operations/move.js';
import DeleteOperation from './operations/delete.js';*/
import TransferOperation from './operations/transfer.js';

const OperationMap = {
  /*Insert   : InsertOperation,
  Update   : UpdateOperation,
  Replace  : ReplaceOperation,
  Move     : MoveOperation,
  Delete   : DeleteOperation,*/
  Transfer : TransferOperation
};

// Entity abstract class
// Note: this class cannot be instantiated directly
export default class {
  constructor(opts) {
  //constructor(container) {
    //this.container = container;
    this.opts = {
      attrs: {}
    };

    this.options   = opts;
    this.node      = null;
    this.modified  = false;
    this.index     = null;
    //this.mutable   = true;
    this.id        = this.identity();

    //  attrs: {}
   // };*/
  }

  appendEntity(entity) {
    entity.render();
    this.operate('Transfer', this, this.node); // TODO
  }

  replaceWith(entity) {
    this.operate('Replace', this, entity);
  }

  delete() {
    this.operate('Delete', this);
  }

  update(opts) {
    this.operate('Update', this, opts);
  }

  moveBefore(entity) {
    this.operate('Move', this, entity);
  }

  operate(operationName, ...args) {
    const operation = new OperationMap[operationName](...args);
    const result = operation.execute(this.entities);

    return {
      // Result of operation
      result: result,

      // Rollback operation
      rollback: () => { operation.rollback(this.entities) },

      // Reference to executed operation
      operation: operation,

      // TODO: Add operation status (true if successful, otherwise false)
      status: null // operation.status()
    };
  }

  // Указываем ссылку на элемент, вставленный в DOM
  sync(node) {
    if (node) {
      this.node = node;
      //this.node.easywygEntity = this;
    } else {
      //delete this.node.easywygEntity;
      delete this.node;
    }

    this.modified = false;
  }

  isSynced() {
    return this.node != null
  }

  get attrs() {
    return this.opts.attrs
  }

  // Тип сущности
  get type() {
    return null
  }

  get name() {
    return this.type.replace (/(?:^|[-_])(\w)/g, function (_, c) {
      return c ? c.toUpperCase () : '';
    })
  }

  set options(opts) {
    this.modified = true;
    Object.assign(this.opts, opts);
  }

  identity() {
    return Math.random().toString(36).slice(2);
  }

  view() {
    return null;
  }

  /*delete() {
    this.view.delete(this);
  }*/

  // Entity должно уметь рендерить себя
  // Этот метод должен вызывать метод render() у соответствующего View
  // Рендерим только тогда, когда modified == true
  render() {
    if (this.modified == true) {
      let result = this.view().render(this);
      return result;
    } else {
      return null;
    }
  }
}

/*
    // Значение для создания новой строки
    // Возможные значения:
    // \r - возврат каретки. Создать аналогичный entity, или разбить его на 2.
    // \n - перевод строки. Просто вставить перевод строки (для PRE)
    this.newlineEntry = "\r";

    // Наследовать ли тип entity при создании нового entity при
    // некоторых действиях в текущем.
    // NOTE: Тип entity "BLOCKQUOTE" должен иметь inherit=true,
    // для всех сотальных созданный entity будет "P".
    this.inherit = false;

    // При нажатии enter в конце entity создаем новый, или переходим на следующий.
    // Для типа PRE нужно нажать enter 3 раза.
    // TODO: Возможно, лучше всего это сделать методом с регэкспом внутри.
    this.leaveExpr = "\r";
  // Нужно ли переходить на следующий entity при попытке создания нового?
  // (например, если следующий пустой).
  shouldMoveToNext() {
    return false;
  }

  // Нужно ли переходить на предыдущий entity? при попытке создания нового?
  // (например, если предыдущий пустой)
  shouldMoveToPrev() {
    return false;
  }

  // Может ли сущность быть разбита на 2 сущности?
  canSplit() {
    return false;
  }

  // Может ли сущность склеиться с другой сущностью?
  canConcat(anotherEntity) {
    return false;
  }

  canBreak() {} // br

  // Можно ли удалить сущность при помощи нажатия на крестик в UI :)
  isRemovable() {

  }

  // Можно ли перемещать сущность.
  isMovable() {

  }

  isSelectable() {}
  isEditable() {}
  isEmpty() {}

 */
