import Base from './base'

export default class extends Base {
  constructor(data, start, end, attrs = {}) {
    super(data, start, end)
    this.attrs = attrs
  }

  get type() {
    return 'tag'
  }
}
