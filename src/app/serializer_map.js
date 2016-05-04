// Serializers
import InsertSerializer from './serializers/insert.js';
import UpdateSerializer from './serializers/update.js';
import ReplaceSerializer from './serializers/replace.js';
import MoveSerializer from './serializers/move.js';
import DeleteSerializer from './serializers/delete.js';
import SelectSerializer from './serializers/select.js';
import TransferSerializer from './serializers/transfer.js';
import UndoSerializer from './serializers/undo.js';

export default {
  Insert   : InsertSerializer,
  Update   : UpdateSerializer,
  Replace  : ReplaceSerializer,
  Move     : MoveSerializer,
  Delete   : DeleteSerializer,
  Select   : SelectSerializer,
  Transfer : TransferSerializer,
  Undo     : UndoSerializer
};
