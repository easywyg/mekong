import TaggerGroup from './tagger_group';
import PointCalc from './point_calc';
import {create} from 'virtual-dom';

export default class {
  constructor(text, data) {
    let calc = new PointCalc(text, data);
    this.data = calc.calculate();

    this.sort();
  }

  // Сортировка отрезков
  sort() {
    this.data.sort((a, b) => {
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
  findGroups() {
    // Каждый следующий отрезок должен быть спереди предыдущего и самым длинным
    var line = [0, 0];
    var result = [];

    this.data.forEach((x) => {
      if (x[1] >= line[0] && x[2] > line[1]) {
        result.push(line = [x[1], x[2]]);
      }
    });

    return result;
  }

  // Сформировать группы
  group() {
    let result = [];

    this.findGroups().forEach((group) => {
      // Находим отрезки внутри группы
      result.push(this.data.filter((x) => {
        return x[1] >= group[0] && x[2] <= group[1]
      }));
    });

    return result;
  }

  // Создать объекты virtual-dom
  process() {
    let div = document.createElement('div');

    this.group().forEach((x) => {
      let taggerGroup = new TaggerGroup(x);

      taggerGroup.generateVTree().forEach((entry) => {
        if (entry) { // TODO Этогй проверки не должно быть
          div.appendChild(create(entry));
        }
      });
    });

    return div.innerHTML;
  }
}
