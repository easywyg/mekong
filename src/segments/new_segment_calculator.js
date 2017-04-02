import TagSegment from './segment/tag.js'

// Вычисляем новые отрезки
export default class {
  constructor(segments) {
    this.segments = segments
    this.newSegments = []
    this.processedSegments = []
    this.removeSegments = new Set()
  }

  calculate() {
    this.segments.forEach((a, i) => {
      if (a.type != 'tag') return
      this.segments.forEach((b, j) => {
        if (a == b || !['tag', 'whitespace'].includes(b.type)) { return }
        const wasProcessed = this.processedSegments.includes(i)

        // Отрезок пересекается одновременно и с тегами и с пробелом.
        // Создаем на основе него новые отрезки
        if (this.intersectsWithTag(a.start, a.end) && this.intersectsWithWhitespace(a, b) && !wasProcessed) {
          this.processedSegments.push(j)

          const t1 = Math.min(a.start, b.start)
          const t2 = Math.min(a.end, b.end)
          const t3 = Math.max(a.start, b.start)
          const t4 = Math.max(a.end, b.end)

          if (t1 != t3) {
            this.removeSegments.add(i)
            this.newSegments.push(new TagSegment(a.data, t1, t3, a.attrs))
          }

          if (t2 != t4) {
            this.removeSegments.add(i)
            this.newSegments.push(new TagSegment(a.data, t2, t4, a.attrs))
          }
        }
      })
    })

    return {
      newSegments: this.newSegments,
      removeSegments: this.removeSegments
    }
  }

  intersectsWithTag(start, end) {
    return this.segments.find((b) => {
      return start > b.start && start < b.end && end > b.end || start < b.start && end > b.start && end < b.end
    })
  }

  intersectsWithWhitespace(a, b) {
    return b.type == 'whitespace' && a.start < b.start && a.end > b.end
  }
}
