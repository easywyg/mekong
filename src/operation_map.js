// Operations
import InsertOperation from './operations/insert.js';
import UpdateOperation from './operations/update.js';
import ReplaceOperation from './operations/replace.js';
import MoveOperation from './operations/move.js';
import DeleteOperation from './operations/delete.js';
import TransferOperation from './operations/transfer.js';

export default {
  Insert   : InsertOperation,
  Update   : UpdateOperation,
  Replace  : ReplaceOperation,
  Move     : MoveOperation,
  Delete   : DeleteOperation,
  Transfer : TransferOperation
};
