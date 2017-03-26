import TextSegment from './segment/text.js'
import TagSegment from './segment/tag.js'
import WhitespaceSegment from './segment/whitespace.js'
import LineBreakSegment from './segment/line_break.js'

const ORDER = {
  whitespace: 1, // First
  tag: 2, // Second
  text: 3 // Last
}

// Приоритет следования тегов
const PRIORITY = [
  'a', 'abbr', 'acronym', 'cite', 'code', 'dfn', 'kbd', 'strong', 'b', 'samp', 'time', 'em', 'i',
  'del', 's', 'u', 'ins', 'bdo', 'br', 'q', 'sub', 'sup', 'var', 'small', 'big', 'tt',
  's', 'span'
]

// SegmentCalculator
// Calculate segments
export default class Segment {
  constructor(text, markup = [], lineBreaks = []) {
    this.text = text
    this.markup = this.compactMarkup(markup.slice())
    this.lineBreaks = lineBreaks
  }

  compactMarkup(markup) {
    const result = []
    while (markup.length > 0) {
      const cur = markup.shift()

      // Trying to find an adjoining markup
      const nearMarkupIdx = markup.findIndex((x) => cur[0] == x[0] && cur[2] == x[1] && cur[2] < x[2])

      // If the current is adjoin with something
      if (nearMarkupIdx != -1) {
        markup[nearMarkupIdx].start = cur.start
        continue
      }

      // Trying to understand if the current markup is inside
      // in another markup in the source or in result, if so, then do not include it in the result
      const internalMarkup = markup.find((x) => cur[0] == x[0] && cur[1] >= x[1] && cur[2] <= x[2])

      // Trying to find internal markup in result
      const internalResultMarkup = result.find((x) => cur[0] == x[0] && cur[1] >= x[1] && cur[2] <= x[2])

      // Set attrs if not exists
      cur[3] = cur[3] || {}

      if (!internalMarkup && !internalResultMarkup) result.push(cur)
    }

    return result
  }

  calculateMarkupPoints() {
    const points = this.markup.map((x) => x[1])
      .concat(this.markup.map((x) => x[2]))
      .concat([0, this.text.length])

    return Array.from(new Set(points)).sort((a, b) => a - b)
  }

  calculate() {
    if (this.markup.length == 0 && this.lineBreaks.length == 0) {
      return [new TextSegment(this.text, 0, this.text.length)]
    } else {
      return this.calculateSegments()
    }
  }

  calculateSegments() {
    const segments = []
    const points = this.calculateMarkupPoints()
    const remove = new Set()
    let pos = 0;

    // Text segments
    for (let i = 0; i < points.length; i++) {
      const start = points[i]
      const end = points[i + 1]
      const slices = this.text.slice(start, end).split(/(\s+)/)

      slices.forEach((slice) => {
        if (slice.length == 0) return

        if (/\s+/.test(slice)) {
          segments.push(new WhitespaceSegment(slice, pos, (pos += slice.length)))
        } else {
          segments.push(new TextSegment(slice, pos, (pos += slice.length)))
        }
      })
    }

    // Line breaks segments
    this.lineBreaks.forEach((pos) => {
      segments.push(new LineBreakSegment(null, pos, pos))
    })

    // Split text nodes at line breaks
    segments.forEach((a, i) => {
      if (a.type != 'text') return

      segments.forEach((b) => {
        if (b.type != 'line_break') return
        if (b.start < a.start) return

        const slices = [
          a.data.substring(0, b.start),
          a.data.substring(b.start, a.data.length)
        ]

        const end = a.start + slices[0].length

        segments.push(new TextSegment(slices[0], a.start, end))
        segments.push(new TextSegment(slices[1], end, end + slices[1].length))

        remove.add(i)
      })
    })

    // Tag segments
    this.markup.forEach((entry) => {
      segments.push(new TagSegment(entry[0], entry[1], entry[2], entry[3]))
    })

    // Calculate tags intersections. This produces new tag segments and remove old.
    segments.forEach((a, i) => {
      if (a.type != 'tag') return

      segments.forEach((b) => {
        if (a == b || a.data == b.data) { return }
        const intersects = Math.max(a.start, b.start) < Math.min(a.end, b.end)

        if (intersects && (b.type == 'whitespace')) {
          const t1 = Math.min(a.start, b.start)
          const t2 = Math.min(a.end, b.end)
          const t3 = Math.max(a.start, b.start)
          const t4 = Math.max(a.end, b.end)

          if (t1 != t3) {
            remove.add(i)
            segments.push(new TagSegment(a.data, t1, t3, a.attrs))
          }

          if (t2 != t4) {
            remove.add(i)
            segments.push(new TagSegment(a.data, t2, t4, a.attrs))
          }
        }
      })
    })

    // Remove segments that was splitted
    Array.from(remove).reverse().forEach((i) => {
      segments.splice(i, 1)
    })

    this.sortSegments(segments)
    return segments
  }

  // Сортировка отрезков
  sortSegments(segments) {
    segments.sort((a, b) => {
       if (a.start - b.start != 0) return a.start - b.start
       if (a.type == 'tag' && b.type == 'tag' && a.start == b.start) {
         return PRIORITY.indexOf(a.data) > PRIORITY.indexOf(b.data) ? 1 : 0
       }

       return ORDER[a.type] - ORDER[b.type]
    })
  }
}
