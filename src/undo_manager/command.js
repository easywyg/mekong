// Command abstract class
export default class {
  execute() {
    return false
  }

  undo() {
    return false
  }

  redo() {
    this.execute()
  }
}
