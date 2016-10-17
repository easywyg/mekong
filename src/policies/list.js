import Policy from '../policy';

export default class extends Policy {
  canAppend() {
    return true;
  }

  canReplace() {
    return true;
  }

  canDelete() {
    return true;
  }

  canUpdate() {
    return true;
  }

  canMove() {
    return true;
  }
}
