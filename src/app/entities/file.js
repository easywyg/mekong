import Entity from '../entity.js';

// A File Entity
export default class extends Entity {
  get type() {
    return 'file'
  }
}
