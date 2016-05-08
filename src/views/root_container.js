import View from '../view';

// A Root Container View
export default class extends View {
  render(entity) {
    // Nothing to do here
    return entity.el;
  }
}
