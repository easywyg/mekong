export default function(core) {
  return class extends core.Policy {
    canAppend(entity) {
      return false;
    }

    // Can entity be replaced with another entity
    canBeReplaced(entity) {
      return true;
    }

    canBeRemoved() {
      return true;
    }

    canBeMoved() {
      return true;
    }
  }
}
