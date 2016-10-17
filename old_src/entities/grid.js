import Container from '../container';
import View from '../views/grid';

// A Grid Entity
// Грид должен принимать толькоконтейнеры одного вида - GridColumn,
// это нужно будет учесть в политике.
export default class extends Container {
  constructor(container = null) {
    super(container);

    this.opts = {
      attrs : {}
    };

    this.view = new View();
  }

  get type() {
    return 'grid'
  }
}
