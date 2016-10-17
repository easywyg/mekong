'use strict';

// Core extensions
require('./ext.js');

// Core classes
import Entity from './entity.js';
import Container from './container.js';
import View from './view.js';
import Policy from './policy.js';
import Particle from './particle.js';

// Default entities
import ListEntity from './entities/list/export.js';
import ContainerEntity from './entities/container/export.js';

const core = {
  Entity    : Entity,
  Container : Container,
  View      : View,
  Policy    : Policy,
  Particle  : Particle
};

export default function() {
  return {
    coreEntities: {
      List: ListEntity
    },

    usedEntitities: {
      Container: ContainerEntity
    },

    useEntity: function(entry) {
      if (typeof entry === 'string' || entry instanceof String) {
        this.usedEntitities[entry] = this.coreEntities[entry];
      } else {
        for (let key in entry) {
          this.usedEntitities[key] = function(core) {
            return entry[key];
          }
        }
      }

      return null;
    },

    entity: function(name, options) {
      const klass = this.usedEntitities[name](core);
      return new klass(options);
    }
  };
}

// Entities
/*import RootEntity from './entities/root.js';
import ParagraphEntity from './entities/paragraph.js';
import ListEntity from './entities/list.js';
import ListItemEntity from './entities/list_item.js';
import TableEntity from './entities/table.js';
//import TableCellEntity from './entities/table_cell.js';

export default {
  Entity: {
    Root: RootEntity,
    Paragraph: ParagraphEntity,
    List: ListEntity,
    ListItem: ListItemEntity,
    Table: TableEntity//,
    //TableCell: TableCellEntity
  }
};
*/
