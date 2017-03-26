// VTreeListBuilder
// Build list of virtual dom trees
// This separates whole segments list by whitespace segments into few fragments
export default class {
  constructor(segmentCalculator, vtreeBuilder) {
    this.segmentCalculator = segmentCalculator
    this.vtreeBuilder = vtreeBuilder
  }

  build() {
    const segments = this.segmentCalculator.calculate()

    return this.buildSegmentsGroups(segments).map((group) => {
      return this.vtreeBuilder.build(group)
    })
  }

  // Сформировать группы отрезков
  // Одна группа отрезков представляет из себя
  buildSegmentsGroups(segments) {
    const result = []

    this.findGroups(segments).forEach((group) => {
      // Находим отрезки внутри группы
      result.push(segments.filter((segment) => {
        return segment.start >= group[0] && segment.end <= group[1]
      }))
    })

    return result
  }

  // Находим группы отрезков.
  // NOTE: Группы будут созданы, если, например, первый отрезок в this.segments будет текстовым.
  findGroups(segments) {
    // Каждый следующий отрезок должен быть спереди предыдущего и самым длинным
    let line = [0, 0]
    let result = []

    segments.forEach((segment) => {
      if (segment.start >= line[0] && segment.end > line[1]) {
        result.push(line = [segment.start, segment.end])
      }
    })

    return result
  }

  // Сортировка отрезков
  sortSegments(segments) {
    return segments.sort((a, b) => {
      // Сортировка по правому значению
      // Большие правые числа идут первее.
      if (a.start == b.start && a.end < b.end) return 1

      // Сортировка по левому значению
      // Меньшие левые числа идут первее.
      if (a.start > b.start) return 1
      if (a.end < b.end) return -1

      return 0
    })
  }
}
