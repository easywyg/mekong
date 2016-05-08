'use strict';

// Core extensions
require('./ext.js');

import Entities from './entities.js';
import OperationMap from './operation_map.js';
import Serialize from './serialize.js';

export default class {
  constructor() {
    this.entities = new Entities();
  }

  operate(operationName, ...args) {
    const operation = new OperationMap[operationName](...args);
    //const serializer = Serialize(operation);
    //
    //console.log(operation)

    // Откат операции
    const result = operation.execute(this.entities);

    return {
      result: result,
      reverse: () => {
        operation.reverse(this.entities)
      },
      operation: operation
    };
  }
}
