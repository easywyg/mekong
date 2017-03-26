// VTreeBuilder
// Build single virtual dom tree
export default class {
  constructor(vnode, vtext) {
    this.vnode = vnode
    this.vtext = vtext
  }

  // Создаём иерархию для группы отрезков.
  // Возвращает VNode.
  build(segments) {
    const result  = []
    const parents = {}
    let current = null

    segments.forEach((segment, i) => {
      switch (segment.type) {
      case 'tag':
        if (Array.isArray(segment.attrs['class'])) {
          segment.attrs['class'] = segment.attrs['class'].join(' ')
        }

        const vnode = new this.vnode(segment.data, { attributes: segment.attrs }, [])
        let currentWasCleared = current == null

        if (current) {
          parents[JSON.stringify(segment.toJSON())] = current
          current.children.push(vnode)
          current.count++
        }

        current = vnode
        if (result.length == 0 || currentWasCleared) result.push(current)
        break
      case 'text':
      case 'whitespace':
        if (segment.type == 'whitespace') current = null

        if (current) {
          current.children.push(new this.vtext(segment.data))
          current.count++
        } else {
          result.push(new this.vtext(segment.data))
        }

        // При выходе из тега, нужно находить родительский vnode
        let prev = segments[i - 1]
        if (prev && segment.start == prev.start && segment.end == prev.end) {
          current = parents[JSON.stringify(prev.toJSON())]

          if (current) {
            current.count++
          }
        }

        break
      case 'line_break':
        if (current) {
          current.children.push(new this.vnode('br', { attributes: segment.attrs }, []))
          current.count++
        }
        break
      }
    })

    return result
  }
}
