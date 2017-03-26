// Порядок следования тегов в том случае, если у двух тегов
// одинаковые позиции начала и конца. Чем меньше индекс в массиве, тем тег первее.
const TAGS = [
  'a', 'abbr', 'acronym', 'cite', 'code', 'dfn', 'kbd', 'strong', 'b', 'samp', 'time', 'em', 'i',
  'del', 's', 'u', 'ins', 'bdo', 'br', 'q', 'sub', 'sup', 'var', 'small', 'big', 'tt',
  's', 'span'
]

// VTreeBuilder
// Build single virtual dom tree
export default class {
  constructor(vnode, vtext) {
    this.vnode = vnode
    this.vtext = vtext
  }

  // Создаём иерархию для группы отрезков.
  // Возвращает VNode.
  build(segmentGroup) {
    segmentGroup.sort((a, b) => {
      // Сортировка по правому значению
      // Большие правые числа идут первее.
      if (a.start == b.start && a.end < b.end && a.type == 'tag' && b.type == 'tag') return 1
      if (a.start == b.start && a.end < b.end && a.type == 'text' && b.type == 'text') return 0

      // Сортировка по левому значению
      // Меньшие левые числа идут первее.
      if (a.start > b.start) return 1
      if (a.end < b.end) return -1

      return 0
    })

    let result  = null
    let current = null
    let parents = {}

    segmentGroup.forEach((segment, i) => {
      switch (segment.type) {
      case 'tag':
        if (Array.isArray(segment.attrs['class'])) {
          segment.attrs['class'] = segment.attrs['class'].join(' ')
        }

        const vnode = new this.vnode(segment.data, { attributes: segment.attrs }, [])

        if (current) {
          parents[JSON.stringify(segment.toJSON())] = current
          current.children.push(vnode)
        }

        current = vnode
        if (!result) result = current
        break
      case 'text':
      case 'whitespace':
        if (current) {
          current.children.push(new this.vtext(segment.data))

          // При выходе из тега, нужно находить родительский vnode
          let prev = segmentGroup[i - 1]
          if (segment.start == prev.start && segment.end == prev.end) {
            current = parents[JSON.stringify(prev)]
          }
        } else {
          result = new this.vtext(segment.data)
        }
        break
      case 'line_break':
        if (current) {
          current.children.push(new this.vnode('br', { attributes: segment.attrs }, []))
        }
        break
      }
    })

    return result
  }
}
