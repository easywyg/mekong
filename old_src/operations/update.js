import Operation from '../operation';
import InsertOperation from '../operations/insert';
import ReplaceOperation from '../operations/replace';

export default class extends Operation {
  // Принимает инстанс сущности и опции
  constructor(entity, opts) {
    super();

    this.entity = entity;
    this.opts = opts;
    this._rollback = {};
    this.status = false;
  }

  get type() {
    return 'update'
  }

  // Обновить текст в соответствии с переданными параметрами
  _updateText(original, update, start, end) {
    if (typeof update == 'undefined') return original;

    // Обновляем текст целиком
    if (typeof start == 'undefined' && typeof end == 'undefined') {
      return update;

    // Обновляем текст на указанных позициях
    } else {
      const len = original.length;

      if (start > len || end > len) return original;
      if (start == null || end == null) return original;

      const startBefore = 0;
      const endBefore   = start;
      const startAfter  = end;
      const endAfter    = len;

      return [
        original.substr(startBefore, endBefore),
        update,
        original.substr(startAfter, endAfter)
      ].join('')
    }
  }

  // Обновить указанный entity. Обновляет внутреннее представление сущности.
  execute() {
    console.log('operate')
    //let opts = Object.assign({}, this.entity.opts);
    console.log('YYY', this.opts)

    if (this.entity._representation.text) {
      // _representation должен обновляться внутри операции update
      this.entity._representation.text = this._updateText(
        this.entity._representation.text, this.opts.text, this.opts.start, this.opts.end
      )
    }

    // Keep entity opts for rollback()
    /*this._rollback = {
      opts: Object.assign({}, this.entity.opts);,
      entity: this.entity
    };*/

    //this.entity.options = this.opts;
    //entities.render();
    this.entity.render()

    return this.entity;
  }

  rollback(entities) {
    const insertOperation = new InsertOperation(
      this._rollback.entity.name,
      this._rollback.opts,
      this.entity.container
    );

    const insertedEntity = insertOperation.execute(entities);
    const replaceOperation = new ReplaceOperation(
      this.entity, insertedEntity
    );

    replaceOperation.execute(entities);

    return null;
  }
}
