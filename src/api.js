'use strict';

// Core extensions
require('./ext.js');

import Entities from './entities.js';

// Operations
import InsertOperation from './operations/insert.js';
import UpdateOperation from './operations/update.js';
import ReplaceOperation from './operations/replace.js';
import MoveOperation from './operations/move.js';
import DeleteOperation from './operations/delete.js';
import TransferOperation from './operations/transfer.js';

const OperationMap = {
  Insert   : InsertOperation,
  Update   : UpdateOperation,
  Replace  : ReplaceOperation,
  Move     : MoveOperation,
  Delete   : DeleteOperation,
  Transfer : TransferOperation
};

export class Api {
  constructor() {
    this.entities = new Entities();
  }

  operate(operationName, ...args) {
    const operation = new OperationMap[operationName](...args);
    const result = operation.execute(this.entities);

    return {
      // Result of operation
      result: result,

      // Rollback operation
      rollback: () => { operation.rollback(this.entities) },

      // Reference to executed operation
      operation: operation,

      // TODO: Add operation status (true if successful, otherwise false)
      status: null // operation.status()
    };
  }
}
