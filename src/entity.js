// Entity base class
export default class {
  constructor(options) {
    const self = this

    this.type = this.constructor.type

    this.state = new Proxy(Object.assign(this.constructor.defaultState, options || {}), {
      set(target, key, value) {
        target[key] = value
        self.onSetProp(target, key, value)
        return true
      }
    })

    // Callbacks
    this.onStateChange = () => {}
    this.onSetProp = (target, propName, propValue) => {}

    // Reference to DOM node
    this.node = null

    // Entity's Virtual DOM tree
    this.vtree = null

    this.id = this.generateId();
    //this.container = null;

    /*this.siblings = {
      prev: null,
      next: null
    }*/
  }

  runCommand(command, execCommandItself) {
    this.onCommand(command, execCommandItself)
  }

  changeState() {
    this.onStateChange()
  }

  /*prev() {
    return this.container.prev(this);
  }

  next() {
    return this.container.next(this);
  }*/

  generateId() {
    return Math.random().toString(36).slice(2);
  }
}
