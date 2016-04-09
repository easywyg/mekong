'use strict';

// Core extensions
require('./ext.es6');

import EditZone from './ui/edit_zone.es6';
import Entities from './entities.es6';
import OperationMap from './operation_map.es6';
import Serialize from './serialize.es6';

class Easywyg {
  constructor(el) {
    this.el = el;
    this.editZone = new EditZone();
    this.entities = new Entities();

    this.render();
  }

  render() {
    this.editZone.render()
  }

  on(event) {

  }

  fire(event, ...args) {

  }

  operate(operationName, ...args) {
    const operation = new OperationMap[operationName](...args);

    this.fire('operate', operation);
    const serializer = Serialize(operation);
    //console.log(serializer.serialize());

    // Откат операции
    const result = operation.execute(this.entities);
    operation.reverse(this.entities);

    // ТУДУ: Результатом работы операции можно сделать специальный объект,
    // который будет включать в себя ссылки на операцию и на результат выполнения операции.
    return result;
  }
}

export default Easywyg;

if (window) {
  window.Easywyg = Easywyg;
}
