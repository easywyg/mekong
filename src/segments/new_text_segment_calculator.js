import TextSegment from './segment/text.js'
import WhitespaceSegment from './segment/whitespace.js'

// NewTextSegmentsCalculator
export default class {
  constructor(text, markup) {
    this.text = text
    this.markup = markup
  }

  hasInternalTag(start, end) {
    return this.markup.find((x) => {
      return x[1] < start && x[2] < end
    })
  }

  calculateMarkupPoints() {
    const points = this.markup.map((x) => x[1])
      .concat(this.markup.map((x) => x[2]))
      .concat([0, this.text.length])
    return Array.from(new Set(points)).sort((a, b) => a - b)
  }

  intersectsWithTag(start, end) {
    return this.markup.find((b) => {
      //console.log(start, end, b)
      return start > b[1] && start < b[2] && end > b[2] || start < b[1] && end > b[1] && end < b[2]
    })
  }

  isWhitespace(slice, pos) {
    const start = pos
    const end = slice.length + pos
    const isSpace = /\s+/.test(slice)

    //console.log('slice', slice)

    // TODO Тут еще проверять, что x не пересекается другими тегами
    // isNotIntersects
    // Проверяем, что пробел не находится внутри тега и этот тег не пересекается с другими тегами (так
    // как в этом случае, в дальнейшем он будет разбит на несколько сегментов)
    const isWithinTag = this.markup.find((x) => {
      return start >= x[1] && end <= x[2] && !this.intersectsWithTag(x[1], x[2])
    })

    return isSpace// && !isWithinTag
  }

  calculate() {
    const points = this.calculateMarkupPoints()
    const newSegments = []
    let pos = 0

    //console.log('points', points)

    for (let i = 0; i < points.length; i++) {
      const start = points[i]
      const end = points[i + 1]

      // <p><strong><span>Hello</span> world</strong></p>
      //if (this.hasInternalTag(start, end)) {
        this.text.slice(start, end).split(/(\s+)/).forEach((slice) => {
          if (slice.length == 0) return

          //console.log('slice', slice)

          // Что есть whitespace? это пробел, который не находится внутри какого-либо тега
          if (this.isWhitespace(slice, pos)) {
            newSegments.push(new WhitespaceSegment(slice, pos, (pos += slice.length)))
          } else {
            newSegments.push(new TextSegment(slice, pos, (pos += slice.length)))
          }
        })
      /*} else {
        let text = this.text.slice(start, end)

        if (text.length > 0) {
          newSegments.push(new TextSegment(text, pos, (pos += text.length)))
        }
      }*/
    }

    //console.log('====================')
    //console.log(newSegments)
    //console.log('====================')
    return newSegments
  }
}
