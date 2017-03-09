'use strict';

// Core extensions
require('./ext.js');

// Core classes
import Entity from './entity.js';
import Container from './container.js';
import View from './view.js';
import Policy from './policy.js';
import Particle from './particle.js';
import Entities from './entities.js';

// Default entities
import ListEntity from './entities/list/export.js';
import TableEntity from './entities/table/export.js';
import ParagraphEntity from './entities/paragraph/export.js';
//import RootEntity from './entities/root/export.js';
//import ContainerEntity from './entities/container/export.js';

const core = {
  Entity      : Entity,
  Container   : Container,
  View        : View,
  Policy      : Policy,
  Particle    : Particle
};

export default class Mekong {
  constructor(root) {
    this.root = root;

    this.coreEntities = {
      List      : ListEntity,
      Table     : TableEntity,
      Paragraph : ParagraphEntity
      //Root: RootEntity
    }

    this.usedEntitities = {}
    this.entities = new Entities(this.root)
  }

  useEntity(entry) {
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
  }

  entity(name, options) {
    const klass = this.usedEntitities[name](core);
    const entity = new klass(this.root, options);

    return this.entities.add(entity)
  }

  canUndo() {
    return this.entities.undoManager.canUndo()
  }

  canRedo() {
    return this.entities.undoManager.canRedo()
  }

  undo() {
    if (this.canUndo()) {
      this.entities.undoManager.undo()
    }
  }

  redo() {
    if (this.canRedo()) {
      this.entities.undoManager.redo()
    }
  }
/*

  return {
    coreEntities: {
      List: ListEntity,
      Root: RootEntity
    },

    usedEntitities: {
      //Container: ContainerEntity
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
      console.log('yay')
      const klass = this.usedEntitities[name](core);
      return new klass(options);
    }
  };
*/
}
