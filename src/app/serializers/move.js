import Serializer from '../serializer.js'

// Move Serializer
export default class extends Serializer {
  // Return JSON
  serialize() {
    return {
      type: 'Move',
      id: '',
      entityId: '',
      afterEntityId: ''
    }
  }
}
