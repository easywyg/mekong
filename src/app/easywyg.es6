'use strict';

// UI
import EditZone from './ui/edit_zone.es6';

// Entities
import Entities from './entities.es6';
import ParagraphEntity from './entities/paragraph.es6';
import ImageEntity from './entities/image.es6';
import GridEntity from './entities/grid.es6';
import ContainerEntity from './entities/container.es6';
import SubstrateEntity from './entities/substrate.es6';

// Operations
import InsertOperation from './operations/insert.es6';
import UpdateOperation from './operations/update.es6';
import ReplaceOperation from './operations/replace.es6';
import MoveOperation from './operations/move.es6';
import DeleteOperation from './operations/delete.es6';

const ENTITY_MAP = {
  Paragraph : ParagraphEntity,
  Image     : ImageEntity,
  Grid      : GridEntity,
  Container : ContainerEntity,
  Substrate : SubstrateEntity
};

const OPERATION_MAP = {
  Insert  : InsertOperation,
  Update  : UpdateOperation,
  Replace : ReplaceOperation,
  Move    : MoveOperation,
  Delete  : DeleteOperation
};

window.Easywyg = class {
  constructor(el) {
    this.el = el;
    this.editZone = new EditZone();
    this.entities = new Entities();

    this.render();
  }

  render() {
    this.editZone.render()
  }

  insertEntity(entityName, container, opts = {}) {
    const entity = (new ENTITY_MAP[entityName](container)).update(opts);
    this.execute(new OPERATION_MAP['Insert'](entity));

    return entity;
  }

  operation(operationName, entity, ...args) {
    return this.execute(new OPERATION_MAP[operationName](entity, ...args));
  }

  execute(operation) {
    return operation.execute(this.entities);
  }
}

//// Exports

// Entities
window.Easywyg.Entity = ENTITY_MAP;

// Operations
window.Easywyg.Operation = OPERATION_MAP;
