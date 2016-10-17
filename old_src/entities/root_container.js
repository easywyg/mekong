import ContainerEntity from '../container';
import View from '../views/root_container';

// A Root Container Entity
// Эта сущность не создаёт и не обновляет HTML, она привязывается к указанному элементу el
// в момент инициализации.
export default class extends ContainerEntity {
  constructor(opts) {
    super(opts);

    this.el = opts.as;
    /*
    this.opts = opts;
    this.view = new View();*/
    //.appendChild(node);
    this.view().render(this);
  }

  view() {
    return new View();
  }

  get type() {
    return 'root_container'
  }
}
