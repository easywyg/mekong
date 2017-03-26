// A Segment representation
export default class {
  constructor(data, start, end) {
    this.data = data
    this.start = start
    this.end = end
  }

  toJSON() {
    return {
      data: this.data,
      start: this.start,
      end: this.end,
      type: this.type
    }
  }

  get type() {
    throw new Error('Should be implemented')
  }
}
