export default function(core) {
  return class extends core.Policy {
    static allowedTags = ['p', 'address']
    static allowMutate = ['heading', 'preformatted']
    static allowJoin = ['paragraph', 'heading', 'preformatted']
    static lineBreak = core.Policy.BREAKS.HTML_BREAK
    static lineBreakMutate = {
      'preformatted': core.Policy.BREAKS.NEW_LINE,
      'heading': core.Policy.BREAKS.SPACE
    }

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

    canLineBreak(position) {
      return position > 0 && position < this.entity.state.text.length
    }
  }
}
