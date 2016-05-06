import Operation from '../../operation.js';

// A Update Operation
// Обновление сущности.
// 1. Какие типы сущностей могут обновляться этой операцией, все или нет? на данный момент
//    эта операция умеет обновлять только сущности Paragraph. Возможно, под каждую сущность нужно
//    делать отдельный класс для обновления конкретного типа сущностей, а данный класс будет фабрикой.
// 2. Для замены одной сущности на другую эта операция не подходит, надо юзать ReplaceOperation.
export default class extends Operation {
  // Принимает инстанс сущности и опции
  constructor(entity, opts) {
    super();

    this.entity = entity;
    this.opts = opts;
  }

  get type() {
    return 'update'
  }

  // Обновить текст на указанных позициях при помощи текста из update
  updateText(update, start, end) {
    if (typeof update == 'undefined') return;

    // Обновляем текст целиком
    if (typeof start == 'undefined' && typeof end == 'undefined') {
      this.entity.opts.text = update;

    // Обновляем текст на указанных позициях
    } else {
      const text = this.entity.opts.text;
      const len = text.length;

      if (start > len || end > len) return;
      if (start == null || end == null) return;

      const startBefore = 0;
      const endBefore   = start;
      const startAfter  = end;
      const endAfter    = len;

      this.entity.opts.text = [
        text.substr(startBefore, endBefore),
        update,
        text.substr(startAfter, endAfter)
      ].join('')
    }
  }

  // Обновить разметку
  updateMarkup(markup = []) {
    if (markup.length == 0) return;
    this.entity.opts.markup = this.entity.opts.markup.concat(markup);
  }

  // Обновить тег или атрибуты тега
  updateTag(tagName, attrs = {}) {
    Object.assign(this.entity.opts.attrs, attrs);

    if (typeof tagName != 'undefined' && tagName.length > 0) {
      this.entity.tag = tagName;
    }
  }

  // Обновить указанный entity
  execute(entities) {
    // Обновляем текст
    this.updateText(
      this.opts.text,
      this.opts.start,
      this.opts.end
    )

    // Обновляем разметку
    this.updateMarkup(this.opts.markup);

    // Обновляем тег
    this.updateTag(this.opts.tag, this.opts.attrs);

    this.entity.modified = true;
    return entities.render();
  }
}
