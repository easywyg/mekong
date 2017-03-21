export default function(core) {
  return class extends core.Policy {
    static allowedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

    canAppend() {
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
