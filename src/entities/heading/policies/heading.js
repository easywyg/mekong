export default function(core) {
  return class extends core.Policy {
    static allowedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    static allowMutate = ['preformatted', 'paragraph']
    static allowJoin = ['paragraph', 'heading', 'preformatted']
    static lineBreak = null
    static lineBreakMutate = {
      'preformatted': core.Policy.BREAKS.NEW_LINE,
      'paragraph': core.Policy.BREAKS.HTML_BREAK
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
      return false
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
