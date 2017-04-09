// VTreeBuilder
// Build single virtual dom tree
export default class {
  constructor(vnode, vtext) {
    this.vnode = vnode
    this.vtext = vtext
  }

  build(segments) {
    let parent = null
    let result  = { children: [] }
    let pos = 0
    let tagStack = []
    let parentEntries = []

    while (segments.length > 0) {
      let seg = segments.shift()
      parent = parentEntries[parentEntries.length - 1] || result

      if (seg.type == 'tag') {
        if (Array.isArray(seg.attrs['class'])) {
          seg.attrs['class'] = seg.attrs['class'].join(' ')
        }

        const entry = new this.vnode(seg.data, { attributes: seg.attrs }, [])
        parent.children.push(entry)
        parentEntries.push(entry)
        parentEntries.map((x) => x.count++ )
        tagStack.push(seg)
        parent = entry
      } else if (['text', 'whitespace'].includes(seg.type)) {
        parent.children.push(new this.vtext(seg.data))
        parentEntries.map((x) => x.count++ )

        const curTag = tagStack[tagStack.length - 1]
        if (curTag && curTag.end == seg.end) {
          const countMatchedTags = tagStack.filter((x) => curTag.end == x.end).length
          for (let i of Array(countMatchedTags).keys()) {
            tagStack.pop()
            parentEntries.pop()
          }
        }
      }
    }

    return result.children
  }
}
