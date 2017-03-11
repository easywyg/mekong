export default function(core) {
  return class extends core.Policy {
    canAppend(entity) {
      return entity.type == 'paragraph';
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
  }
}
