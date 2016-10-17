import Entity from '../entity';
import View from '../views/table';
import merge from 'deepmerge';
import {updateText} from './lib/utils';

// A Table Entity
export default class extends Entity {
  constructor(container = null) {
    super(container);

    this.opts = {
      caption : '',
      attrs   : {
        table : {},
        caption : {}
      },
      markup: [],
      data: []
    };

    this.view = new View();
  }

  // Обновить разметку
  updateMarkup(markup = []) {
    if (markup.length == 0) return;
    this.opts.markup = this.opts.markup.concat(markup);
  }

  // Установить строки/колонки
  setData(data) {
    if (typeof data == 'undefined') return;

    // Устанавливаем данные впервые
    if (this.opts.data.length == 0) {
      this.addData(data);
    }
    // Обновляем данные
    else {
      this.updateData(data);
    }
  }

  addData(data) {
    this.opts.data = data;
    this.opts.data.forEach((row) => {
      row.forEach((cell) => {
        cell.meta._text = cell.text;
      })
    });
  }

  updateData(data) {
    this.opts.data = merge(this.opts.data, data);
    this.opts.data.forEach((row) => {
      row.forEach((cell) => {
        if (typeof cell.start != 'undefined' && typeof cell.end != 'undefined') {
          let origText = cell.meta._text;

          // Обновляем текст ячейки
          cell.text = updateText(
            origText,
            cell.text,
            cell.start,
            cell.end
          )

          cell.meta._text = cell.text;
        }
      })
    });
  }

  set options(opts) {
    this.modified = true;

    // Обновляем атрибуты
    Object.assign(this.opts.attrs, opts.attrs);

    // Обновляем caption
    this.opts.caption = updateText(
      this.opts.caption,
      opts.caption,
      opts.start,
      opts.end
    )

    // Обновляем разметку
    this.updateMarkup(opts.markup);

    // Обновляем данные строк/колонок
    this.setData(opts.data);
  }

  get type() {
    return 'table'
  }

  get markup() {
    return this.opts.markup
  }
}
