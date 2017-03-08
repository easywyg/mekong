// Operation abstract class
// Note: this class cannot be instantiated directly
export default class {
  // Выполняет команду.
  execute() {
    throw new Error('Should be implemented')
  }

  // Откат команды. Выполняет действие, противоположное execute.
  rollback() {
    throw new Error('Should be implemented')
  }

  get type() {
    throw new Error('Should be implemented')
  }
}
