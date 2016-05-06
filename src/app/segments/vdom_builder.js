import Builder from './builder';
import Normalizer from './normalizer';

export default class {
  constructor(text, markup) {
    let calc = new Normalizer(text, markup);
    this.segments = calc.calculate();

    this.sort();
  }

  // Сортировка отрезков
  sort() {
    this.segments.sort((a, b) => {
      // Сортировка по правому значению
      // Большие правые числа идут первее.
      if (a[1] == b[1] && a[2] < b[2]) return 1;

      // Сортировка по левому значению
      // Меньшие левые числа идут первее.
      if (a[1] > b[1]) return 1;
      if (a[1] < b[1]) return -1;

      return 0;
    });
  }

  // Находим группы отрезков.
  // NOTE: Группы будут созданы, если, например, первый отрезок в this.segments будет текстовым.
  findGroups() {
    // Каждый следующий отрезок должен быть спереди предыдущего и самым длинным
    var line = [0, 0];
    var result = [];

    this.segments.forEach((segment) => {
      if (segment[1] >= line[0] && segment[2] > line[1]) {
        result.push(line = [segment[1], segment[2]]);
      }
    });

    return result;
  }

  // Сформировать группы отрезков
  group() {
    let result = [];

    this.findGroups().forEach((group) => {
      // Находим отрезки внутри группы
      result.push(this.segments.filter((segment) => {
        return segment[1] >= group[0] && segment[2] <= group[1]
      }));
    });

    return result;
  }

  // Создать список объектов virtual-dom
  process() {
    return this.group().map((segments) => {
      return (new Builder(segments)).generate();
    });
  }
}
