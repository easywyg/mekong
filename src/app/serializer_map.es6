// Serializers
import InsertSerializer from './serializers/insert.es6';
import UpdateSerializer from './serializers/update.es6';
import ReplaceSerializer from './serializers/replace.es6';
import MoveSerializer from './serializers/move.es6';
import DeleteSerializer from './serializers/delete.es6';
import SelectSerializer from './serializers/select.es6';
import TransferSerializer from './serializers/transfer.es6';
import UndoSerializer from './serializers/undo.es6';

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
