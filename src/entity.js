// Entity base class
export default class {
  constructor(state) {
    this.core = null

    const self = this

    this.type = this.constructor.type
    state = Object.assign(this.constructor.defaultState, state || {})

    this.state = new Proxy(state, {
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
    return this.onCommand(command, execCommandItself)
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

  // Replace entity with current entity
  replace(withEntity) {
    if (withEntity.policy.canBeReplaced(this)) {
      this.runCommand(
        new this.core.Command.Replace(withEntity, this)
      )
    }
  }

}
