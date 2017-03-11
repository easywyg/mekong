import Command from '../../../../undo_manager/command.js';

export default class extends Command {
  constructor(particle) {
    super()

    this.particle = particle
    this.item = null
  }

  execute() {
    const newState = JSON.parse(JSON.stringify(this.particle.constructor.defaultState))

    this.particle.items.push(newState);
    this.item = new this.particle.constructor(
      newState.items, this.particle.entity
    );

    // Синхронизация состояния
    this.item.state = newState;
    return true
  }

  undo() {
    return false
  }
}
