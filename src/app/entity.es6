// Entity abstract class
// Note: this class cannot be instantiated directly
export default class {
  constructor(container = null) {
    this.container = container;
    this.node      = null;
    this.modified  = false;
    this.deleted   = false;
    this.index     = null;
    this.mutable   = true;
    this.id        = this.identity();

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

    this.opts = {
      attrs: {}
    };
  }

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

  // Указываем ссылку на элемент, вставленный в DOM
  sync(node) {
    if (node) {
      this.node = node;
      this.node.easywygEntity = this;
    } else {
      delete this.node.easywygEntity;
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

  identity() {
    return Math.random().toString(36).slice(2);
  }

  // Entity должно уметь рендерить себя
  // Этот метод должен вызывать метод render() у соответствующего View
  // Рендерим только тогда, когда modified == true
  render() {
    if (this.modified == true) {
      this.modified = false;
      return this.view.render(this);
    } else {
      return null;
    }
  }
}
