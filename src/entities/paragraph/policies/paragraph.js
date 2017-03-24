export default function(core) {
  return class extends core.Policy {
    static allowedTags = ['p', 'address']
    static allowMutate = ['heading', 'preformatted']
    static allowJoin = ['paragraph', 'heading', 'preformatted'] // TODO

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
      return this.constructor.allowJoin.includes(withEntity.type)
    }

    canBeMutated(entityType) {
      return this.constructor.allowMutate.includes(entityType.toLowerCase())
    }
  }
}
