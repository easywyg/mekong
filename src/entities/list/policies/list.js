export default function(core) {
  return class extends core.Policy {
    static allowedTags = ['ul', 'ol']

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

    canBeSplitted(position) {
      return false
    }

    canBeJoined(withEntity) {
      return false
    }
  }
}
