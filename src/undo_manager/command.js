// Command abstract class
export default class {
  execute() {
    throw new Error("override me!")
  }

  undo() {
    throw new Error("override me!")
  }

  redo() {
    this.execute()
  }
}
