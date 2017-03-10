export default function(core) {
  return class extends core.Policy {
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
}
