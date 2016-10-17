// Policy abstract class
// Note: this class cannot be instantiated directly
export default class {
  constructor(entity) {
    this.entity = entity;
  }

  canAppend() {
    return false;
  }

  canReplace() {
    return false;
  }

  canDelete() {
    return false;
  }

  canUpdate() {
    return false;
  }

  canMove() {
    return false;
  }
}
