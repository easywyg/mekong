// Operations
import InsertOperation from './operations/insert.es6';
import UpdateOperation from './operations/update.es6';
import ReplaceOperation from './operations/replace.es6';
import MoveOperation from './operations/move.es6';
import DeleteOperation from './operations/delete.es6';
import SelectOperation from './operations/select.es6';
import TransferOperation from './operations/transfer.es6';
import UndoOperation from './operations/undo.es6';

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
