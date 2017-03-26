import Base from './base'

export default class extends Base {
  constructor(data, start, end, attrs = {}) {
    super(data, start, end)
    this.attrs = attrs
  }

  toJSON() {
    return {
      attrs: this.attrs,
      data: this.data,
      start: this.start,
      end: this.end,
      type: this.type
    }
  }

  get type() {
    return 'tag'
  }
}
