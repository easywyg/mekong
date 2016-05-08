import ContainerEntity from '../container';
import View from '../views/root_container';

// A Root Container Entity
// Эта сущность не создаёт и не обновляет HTML, она привязывается к указанному элементу el.
export default class extends ContainerEntity {
  constructor(node = null) {
    super(node);

    this.opts = {};
    this.view = new View();
  }

  get type() {
    return 'root_container'
  }
}
