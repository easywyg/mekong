// Serializer Abstract class
export default class {
  constructor(operation) {
    this.operation = operation;
  }

  serialize() {
    throw new Error('Should be implemented')
  }
}
