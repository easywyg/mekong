import Serializer from '../serializer.es6'

// Transfer Serializer
export default class extends Serializer {
  // Return JSON
  serialize() {
    return {
      type: 'Transfer',
      id: '',
      containerId: '',
      opts: this.operation.opts
    }
  }
}
