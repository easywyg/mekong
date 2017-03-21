export default function(core) {
  return class extends core.Policy {
    static allowedTags = ['p', 'address']

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
      return position > 0 && position < this.entity.state.text.length
    }

    canBeJoined(withEntity) {
      return false
    }
  }
}
