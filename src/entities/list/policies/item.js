export default function(core) {
  return class extends core.Policy {
    canAppend(entity) {
      return false;
    }

    // Can entity be replaced with another entity
    canBeReplaced(entity) {
      return false;
    }

    canBeRemoved() {
      return true;
    }

    canBeMoved() {
      return false;
    }

    canBeSplitted(position) {
      return false
    }

    canBeJoined(withEntity) {
      return false
    }
  }
}
