import merge from 'deepmerge';

export default function(core) {
  // List view
  return class extends core.View {
    build(entity) {
      const children = this.buildMarkup(entity.state.text, entity.state.markup)
      return new this.vnode(entity, { attributes: merge({}, entity.state.attrs) }, children)
    }
  }
}
