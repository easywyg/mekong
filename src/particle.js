// Particle abstract class
// Particle is a inner part of Entity. Some entities may have inner particles, some not.
export default class {
  constructor() {
    this.state = new Proxy(Object.assign({}, this.constructor.defaultState), {
      set(target, key, value) {
        target[key] = value
        return true
      }
    })
  }
}
