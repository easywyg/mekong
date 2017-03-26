// SegmentNormalizer
// Нормализует отрезки, создает новые отрезки. В общем, подготавливает отрезки для
// дальнейшего использования другими классами.
export default class {
  constructor(text, markup = [], lineBreaks = []) {
    this.text = text;
    this.lineBreaks = [3, 5]

    // Нужно ли рассчитывать новые отрезки?
    this.shouldCalcNewSegments = true;

    if (markup.length == 0) {
      this.markup = this.buildMarkup();
      this.shouldCalcNewSegments = false;
    } else {
      this.markup = this.compactMarkup(this.cloneMarkup(markup))

      // Рассчитывает отрезки, занимаемые текстовыми нодами
      this.markup = this.markup.concat(this.calcTextNodeSegments())
    }
  }

  // Создаем разметку из переданного текста в том случае,
  // если переданный список разметки пуст.
  buildMarkup() {
    return [
      [this.text, 0, this.text.length, { type: 3, attrs: {} }]
    ];
  }

  // Клонируем разметку
  cloneMarkup(markup) {
    const result = [];
    markup.forEach((x) => {
      // x[3] - это метаданные отрезка
      let meta = { type: null, attrs: {} }

      if (typeof x[3] != 'undefined') {
        meta.attrs = x[3];
      }

      result.push([ x[0], x[1], x[2], meta ])
    });

    return result;
  }

  // Удаляем ненужную разметку
  // Например, из такой разметки:
  // [
  //   ['strong', 0, 5],
  //   ['strong', 0, 11],
  //   ['strong', 3, 7]
  // ]
  //
  // должна получиться такая
  //
  // [
  //   ['strong', 0, 11],
  // ]
  compactMarkup(markup) {
    const result = []
    while (markup.length > 0) {
      const cur = markup.shift()

      // Пытаемся найти соприкасающуюся разметку
      const nearMarkupIdx = markup.findIndex((x) => cur[0] == x[0] && cur[2] == x[1] && cur[2] < x[2])

      // Если текущий соприкасается с чем то
      if (nearMarkupIdx != -1) {
        markup[nearMarkupIdx][1] = cur[1]
        continue
      }

      // Пытаемся понять, находится ли текущая разметка внутри
      // другой разметки в источники или результате, если да, то не включаем её в результат
      const innerMarkup = markup.find((x) => cur[0] == x[0] && cur[1] >= x[1] && cur[2] <= x[2])

      // Пытаемся найти внутреннюю разметку
      const innerResultMarkup = result.find((x) => cur[0] == x[0] && cur[1] >= x[1] && cur[2] <= x[2])

      if (!innerMarkup && !innerResultMarkup) result.push(cur)
    }

    return result
  }

  // Получить граничные точки текстовых нод.
  getPoints() {
    const result = [0]; // Всегда добавляем ноль
    this.markup.forEach((x) => {
      result.push(x[1]);
      result.push(x[2]);
    });

    console.log(this.lineBreaks, 'X')

    // Возвращаем уникальные значения и сортируем в порядке возрастания
    // Array.from(new Set(result)) даёт уникальность
    return Array.from(new Set(result))
                .sort((a, b) => { return a - b });
  }

  // Рассчитывает отрезки, занимаемые текстовыми нодами и пробельными символами
  calcTextNodeSegments() {
    const segments = [];
    const points = this.getPoints();
    let len = 0;

    console.log(points, 'X')

    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const nextPoint = points[i + 1];
      const slices = this.text.slice(point, nextPoint).split(/(\s+)/);
      //console.log(slices, 'slices')

      slices.forEach((slice) => {
        if (slice.length == 0) return

        const segment = [slice, len, (len += slice.length), { type: 3, attrs: {} }];
        Object.defineProperty(segment, 'whitespace', { value: /\s+/.test(slice) });
        segments.push(segment);
      })
    }

/*
    [
      ['Hello', 0, 5],
      [' ', 5, 6],
      ['world!', 6, 12],
    ]

    [
      ['Hel', 0, 3],
      ['\n', 3, 4],
      ['lo', 5, 6],
      ['\n', 6, 7],
      [' ', 7, 8],
      ['world!', 8, 14]
    ]
*/
    console.log('segments', segments)

    return segments
  }

  // Рассчитать новые отрезки
  calculate() {
    if (!this.shouldCalcNewSegments) {
      return this.markup;
    } else {
      const result = [];
      const del = []

      console.log('markupz',this.markup)

      this.markup.forEach((a) => {
        this.markup.forEach((b) => {
          if (a == b) { return }

          // Пересекается ли в точке начала или конца с другим тагом?
          const intersects = this.markup.find((x) => x[0] != a[0] && (x[1] < a[1] || x[2] > a[2]) && x[3].type != 3)

          if (intersects && b.whitespace === true && b[1] >= a[1] && b[2] <= a[2]) {
            const t1 = Math.min(a[1], b[1]);
            const t2 = Math.min(a[2], b[2]);
            const t3 = Math.max(a[1], b[1]);
            const t4 = Math.max(a[2], b[2]);

            if (t1 != t3) {
              result.push([a[0], t1, t3, a[3]])
            }
            if (t2 != t4) { result.push([a[0], t2, t4, a[3]]) }
            del.push(a);
          } else {
            const exists = result.some((x) => x[0] == a[0] && x[1] == a[1] && x[2] == a[2])
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
}
