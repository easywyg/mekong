// Operations
import InsertOperation from './operations/insert.js';
import UpdateOperation from './operations/update.js';
import ReplaceOperation from './operations/replace.js';
import MoveOperation from './operations/move.js';
import DeleteOperation from './operations/delete.js';
import SelectOperation from './operations/select.js';
import TransferOperation from './operations/transfer.js';
import UndoOperation from './operations/undo.js';

export default {
  Insert   : InsertOperation,
  Update   : UpdateOperation,
  Replace  : ReplaceOperation,
  Move     : MoveOperation,
  Delete   : DeleteOperation,
  Select   : SelectOperation,
  Transfer : TransferOperation,
  Undo     : UndoOperation
};
