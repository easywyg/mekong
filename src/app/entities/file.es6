import Entity from '../entity.es6';

// A File Entity
export default class extends Entity {
  get type() {
    return 'file'
  }
}
