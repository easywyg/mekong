import AttrCommand from 'commands/entity/attr.js';
import RemoveAttrCommand from 'commands/entity/remove_attr.js';
import RemoveMarkupCommand from 'commands/entity/remove_markup.js';

const AttrMethods = (superclass) => class extends superclass {
  getAttr(name) {
    return this.state.attrs[name]
  }

  getAttrs() {
    return this.state.attrs
  }

  setAttr(name, value) {
    this.runCommand(new AttrCommand(this.document, this.id, name, value))
  }

  removeAttr(name) {
    this.runCommand(new RemoveAttrCommand(this.document, this.id, name))
  }
};

export default AttrMethods;
