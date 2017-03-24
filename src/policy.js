// Policy abstract class
// Note: this class cannot be instantiated directly
export default class {
  static BREAKS = {
    HTML_BREAK : 1,
    NEW_LINE   : 2,
    SPACE      : 3
  }

  constructor(entity) {
    this.entity = entity;
  }

  canAppend() {
    return false;
  }

  canBeReplaced(entity) {
    return false;
  }

  canBeRemoved() {
    return false;
  }

  canBeMoved() {
    return false;
  }

  canBeSplitted(position) {
    return false;
  }

  canBeJoined(withEntity) {
    return false;
  }

  canBeMutated(entityType) {
    return false;
  }

  canLineBreak() {
    return false;
  }
}
