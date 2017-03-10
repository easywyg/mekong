import AttrCommand from '../commands/common/attr.js';
import RemoveAttrCommand from '../commands/common/remove_attr.js';
import RemoveMarkupCommand from '../commands/common/remove_markup.js';

const AttrMethods = (superclass) => class extends superclass {
  getAttr(name) {
    return this.state.attrs[name]
  }

  getAttrs() {
    return this.state.attrs
  }

  setAttr(name, value) {
    this.runCommand(new AttrCommand(this, this.state, name, value))
  }

  removeAttr(name) {
    this.runCommand(new RemoveAttrCommand(this, this.state, name))
  }
};

export default AttrMethods;
