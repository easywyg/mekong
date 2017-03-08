import Operation from '../operation';

// Update entity with new state
export default class extends Operation {
  constructor(entity, newState) {
    super()

    this.entity = entity;
    this.newState = newState;

    // Keep old state for rollback()
    this._rollback = {
      state: Object.assign({}, this.entity.state)
    };
  }

  get type() {
    return 'update'
  }

  // TODO: Move it to entity_utils.js
  // Обновить текст в соответствии с переданными параметрами
  _updateText(original, update, start, end) {
    if (typeof update == 'undefined') return original;

    // Обновляем текст целиком
    if (typeof start == 'undefined' && typeof end == 'undefined') {
      return update;

    // Обновляем текст на указанных позициях
    } else {
      const len = original.length;

      if (start > len || end > len) return original;
      if (start == null || end == null) return original;

      const startBefore = 0;
      const endBefore   = start;
      const startAfter  = end;
      const endAfter    = len;

      return [
        original.substr(startBefore, endBefore),
        update,
        original.substr(startAfter, endAfter)
      ].join('')
    }
  }

  // Обновить указанный entity. Обновляет состояние сущности и перерендеривает её.
  execute() {
    let state = this.entity.state
    let newState = this.newState

    // Update text
    if (typeof newState.text != 'undefined' && newState.text.length > 0) {
      // _representation должен обновляться внутри операции update
      state.text = this._updateText(
        state.text, newState.text, newState.start, newState.end
      )
    }

    // Update tag
    if (typeof newState.tag != 'undefined' && newState.tag.length > 0) {
      state.tag = newState.tag;
    }

    // Update markup
    if (typeof newState.markup != 'undefined' && newState.markup.length > 0) {
      let newMarkup = state.markup.concat(newState.markup);

      // Toggle markup
      // When we have two equal markup entries, delete both.
      newMarkup = newMarkup.filter((entry) => {
        return newMarkup.filter((entry2) => {
          // entries equality condition
          return entry2[0] == entry[0] && entry2[1] == entry[1] && entry2[2] == entry[2]
        }).length == 1;
      });

      state.markup = newMarkup;
    }

    // Update attributes
    if (typeof newState.attrs != 'undefined') {
      let newAttrs = newState.attrs

      // Convert array values of attributes to strings
      Object.keys(newAttrs).forEach(function (attrName) {
        let value = newAttrs[attrName];

        if (Array.isArray(value)) {
          newAttrs[attrName] = value.join(' ')
        }
      });

      // Merge old attrs with new one
      //import merge from 'deepmerge';
      // TODO: need to deep merge attrs
      Object.assign(state.attrs, newAttrs);
    }

    //entities.render();
    //this.entity.render()

    return this.entity;
  }

  // TODO:
  // Rollback current entity state to previous state.
  // Actually, this rollbacks execute() call
  rollback() {
    //this.entity.state = this._rollback.state;
    //this.entity.render();

    //return null;
  }
}
