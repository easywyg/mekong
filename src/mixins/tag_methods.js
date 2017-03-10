import TagCommand from '../commands/common/tag.js';

const TagMethods = (superclass) => class extends superclass {
  getTag() {
    return this.state.tag
  }

  setTag(newTag) {
    this.runCommand(new TagCommand(this, newTag))
  }
}

export default TagMethods;
