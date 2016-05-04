// SegmentNormalizer
// Нормализует отрезки, создает новые отрезки. В общем, подготавливает отрезки для
// дальнейшего использования другими классами.
export default class {
  constructor(text, markup = []) {
    this.text = text;
    this.markup = this.cloneMarkup(markup);
  }

  // Клонируем разметку
  cloneMarkup(markup) {
    let result = [];
    markup.forEach((x) => {
      // x[3] - это метаданные отрезка
      result.push([ x[0], x[1], x[2], (x[3] || {}) ])
    });

    return result;
  }

  // Получить граничные точки текстовых нод.
  getPoints() {
    let result = [];
    this.markup.forEach((x) => {
      result.push(x[1]);
      result.push(x[2]);
    });

    // Возвращаем уникальные значения и сортируем в порядке возрастания
    // Array.from(new Set(result)) даёт уникальность
    return Array.from(new Set(result))
                .sort((a, b) => { return a - b });
  }

  // Рассчитывает отрезки, занимаемые текстовыми нодами и пробельными символами
  calcTextNodeSegments() {
    var segments = [];
    var points = this.getPoints();
    var len = 0;

    for (var i = 0; i < points.length; i++) {
      var point = points[i];
      var nextPoint = points[i + 1];
      var slices = this.text.slice(point, nextPoint).split(/(\s+)/);

      slices.forEach((slice) => {
        if (slice.length > 0) {
          let segment = [slice, len, (len += slice.length), { type: 3, attrs: {} }];
          Object.defineProperty(segment, 'whitespace', { value: /\s+/.test(slice) });
          segments.push(segment);
        }
      });
    }

    return segments;
  }

  // Рассчитать новые отрезки
  calculate() {
    // Рассчитывает отрезки, занимаемые текстовыми нодами
    this.markup = this.markup.concat(this.calcTextNodeSegments());

    let result = [];
    let del = []

    this.markup.forEach((a) => {
      this.markup.forEach((b) => {
        if (a == b) { return }

        let exists = result.some((x) => {
          return x[0] == a[0] && x[1] == a[1] && x[2] == a[2]
        });

        if (b.whitespace === true && b[1] >= a[1] && b[2] <= a[2]) {
          var t1 = Math.min(a[1], b[1]);
          var t2 = Math.min(a[2], b[2]);
          var t3 = Math.max(a[1], b[1]);
          var t4 = Math.max(a[2], b[2]);

          if (t1 != t3) { result.push([a[0], t1, t3, a[3]]) }
          if (t2 != t4) { result.push([a[0], t2, t4, a[3]]) }
          del.push(a);
        } else {
          if (exists) { return }

          a[3].type = a[3].type || 1;
          a[3].attrs = a[3].attrs || {};

          result.push(a);
        }
      })
    });

    return result.filter((a) => {
      return !del.some((x) => {
        return x[0] == a[0] && x[1] == a[1] && x[2] == a[2]
      });
    });
  }
}
