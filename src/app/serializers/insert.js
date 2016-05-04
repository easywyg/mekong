import Serializer from '../serializer.js'

// Insert Serializer
export default class extends Serializer {
  // Return JSON
  serialize() {
    let containerId = null;

    if (this.operation.entityName != "RootContainer") {
      containerId = this.operation.container.id;
    }

    console.log(this.operation);

    return {
      type: 'Insert',
      id: 'zzz',
      entity: this.operation.entityName,
      containerId: containerId,
      opts: this.operation.opts
    }
  }
}
