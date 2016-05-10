import Serializer from '../serializer'

// Update Serializer
export default class extends Serializer {
  // Return JSON
  serialize() {
    return {
      type: 'Update',
      id: this.operation.entity.id,
      opts: this.operation.opts
    }
  }
}
