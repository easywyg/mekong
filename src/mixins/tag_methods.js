import TagCommand from '../commands/entity/tag.js';

const TagMethods = (superclass) => class extends superclass {
  getTag() {
    return this.state.tag
  }

  setTag(tag) {
    this.runCommand(new TagCommand(this.document, this.id, { tag }))
  }
}

export default TagMethods;
