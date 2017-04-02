import TextSegment from './segment/text.js'
import TagSegment from './segment/tag.js'
import WhitespaceSegment from './segment/whitespace.js'
import LineBreakSegment from './segment/line_break.js'
import NewSegmentCalculator from './new_segment_calculator.js'
import NewTextSegmentCalculator from './new_text_segment_calculator.js'

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

  calculate() {
    if (this.markup.length == 0 && this.lineBreaks.length == 0) {
      return [new TextSegment(this.text, 0, this.text.length)]
    } else {
      return this.calculateSegments()
    }
  }

  calculateSegments() {
    const segments = []

    // Add tag segments
    this.markup.forEach((entry) => {
      segments.push(new TagSegment(entry[0], entry[1], entry[2], entry[3]))
    })

    // Add new calculated text segments
    const ntsc = new NewTextSegmentCalculator(this.text, this.markup)
    ntsc.calculate().forEach((seg) => segments.push(seg))

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

    // Calculate new tag segments and segments to remove
    const nsc = new NewSegmentCalculator(segments)
    const result = nsc.calculate()

    // Remove segments that was splitted
    Array.from(result.removeSegments).reverse().forEach((i) => {
      segments.splice(i, 1)
    })

    // Add new calculated tag segments
    result.newSegments.forEach((seg) => segments.push(seg))

    this.sortSegments(segments)
    //console.log('---------------')
    //segments.forEach((x) => console.log(x.type, x))
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
