'use strict';

// Core extensions
require('./ext.es6');

import Entities from './entities.es6';
import OperationMap from './operation_map.es6';
import Serialize from './serialize.es6';

export default class {
  constructor() {
    this.entities = new Entities();
  }

  operate(operationName, ...args) {
    const operation = new OperationMap[operationName](...args);
    const serializer = Serialize(operation);

    // Откат операции
    const result = operation.execute(this.entities);

    return { 
      result: result, 
      reverse: => {
        operation.reverse(this.entities)
      },
      operation: operation
    };
  }
}
