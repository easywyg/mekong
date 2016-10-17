import Container from '../container';
import View from '../views/root';
import Policy from '../policies/root';

// A Root Container Entity
// Эта сущность не создаёт и не обновляет HTML, она привязывается к указанному элементу el
// в момент инициализации.
export default class extends Container {
  constructor(opts) {
    super(opts);

    this.el = opts.as;

    /*
    this.opts = opts;
    this.view = new View();*/
    //.appendChild(node);
    this.node = this.view.render(this);
  }

  get view() {
    return new View(this);
  }

  get policy() {
    return new Policy(this);
  }

  get type() {
    return 'root'
  }
}
