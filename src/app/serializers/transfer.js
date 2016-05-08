import Serializer from '../serializer'

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
