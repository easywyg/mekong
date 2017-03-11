export default function(core) {
  return class extends core.Policy {
    canAppend() {
      return true;
    }

    // Can entity be replaced with another entity
    canBeReplaced(entity) {
      return false;
    }

    canBeRemoved() {
      return false;
    }

    canBeMoved() {
      return false;
    }
  }
}
