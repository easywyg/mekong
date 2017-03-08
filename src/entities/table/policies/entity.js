export default function(core) {
  return class extends core.Policy {
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
}
