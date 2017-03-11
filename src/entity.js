// Entity base class
export default class {
  constructor(options) {
    const self = this

    this.type = this.constructor.type
    options = Object.assign(this.constructor.defaultState, options || {})

    this.state = new Proxy(options, {
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

    // Parent entity
    this.parentEntity = null;

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

  // Insert entity
  insert(entity) {
    if (!this.policy.canAppend(entity)) {
      return false
    }

    // TODO
  }

  // Remove entity
  remove() {
    if (this.policy.canBeRemoved()) {
      this.runCommand(
        //new RemoveCommand(this.core, this.root, entity)
      )
    }
  }

  // TODO: Need to complete
  // Move entity into containerEntity before beforeEntity
  move(containerEntity, beforeEntity) {
    // && anotherEntity.container.policy.canAppend(entity)
    if (this.policy.canBeMoved(containerEntity, beforeEntity)) {
      this.runCommand(
        //new MoveCommand(this.root, this, containerEntity, beforeEntity)
      )
    }
  }

  // TODO: Need to complete
  // Replace one entity with anotherEntity
  replace(anotherEntity) {
    if (this.policy.canBeReplaced(anotherEntity)) {
      this.runCommand(
        //new ReplaceCommand(this, anotherEntity)
      )
    }
  }

}
