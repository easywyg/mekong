import Serializer from '../serializer.js'

// Update Serializer
export default class extends Serializer {
  // Return JSON
  serialize() {
    return {
      type: 'Update',
      id: '',
      entityId: '',
      opts: this.operation.opts
    }
  }
}
