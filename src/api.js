'use strict';

import {create, diff, patch, VNode, VText} from './vdom/index.js';

// Core extensions
require('./ext.js');

// Lib
import mix from './lib/mix.js';
import EntityUtils from './lib/entity_utils.js';

// Core classes
import Entity from './entity.js';
import Container from './container.js';
import View from './view.js';
import Policy from './policy.js';
import Document from './document.js';
import Command from './undo_manager/command.js';

// Default entities
import ListEntity from './entities/list/export.js';
import TableEntity from './entities/table/export.js';
import ParagraphEntity from './entities/paragraph/export.js';
import GridEntity from './entities/grid/export.js';

// Document commands
import InsertCommand from './commands/document/insert.js';
import RemoveCommand from './commands/document/remove.js';
import MoveCommand from './commands/document/move.js';
import ReplaceCommand from './commands/document/replace.js';

// Entity commands
import AttrCommand from './commands/entity/attr.js';
import RemoveAttrCommand from './commands/entity/remove_attr.js';
import MarkupCommand from './commands/entity/markup.js';
import RemoveMarkupCommand from './commands/entity/remove_markup.js';
import TagCommand from './commands/entity/tag.js';
import TextCommand from './commands/entity/text.js';

// Mixins
import TextMethods from './mixins/text_methods.js';
import MarkupMethods from './mixins/markup_methods.js';
import AttrMethods from './mixins/attr_methods.js';
import TagMethods from './mixins/tag_methods.js';

const core = {
  Entity,
  Container,
  View,
  Policy,
  Command,
  Document,
  Lib : {
    Mix : mix,
    EntityUtils
  },
  Command: {
    Document: {
      Insert: InsertCommand,
      Remove: RemoveCommand,
      Move: MoveCommand,
      Replace: ReplaceCommand
    },
    Entity: {
      Attr: AttrCommand,
      RemoveAttr: RemoveAttrCommand,
      Markup: MarkupCommand,
      RemoveMarkup: RemoveMarkupCommand,
      Tag: TagCommand,
      Text: TextCommand
    }
  },
  Mixin : {
    TextMethods, MarkupMethods,
    AttrMethods, TagMethods
  },
  VDOM : {
    create, diff, patch, VNode, VText
  },
};

export default class Mekong {
  constructor(root) {
    this.document = new Document(core, root)

    this.coreEntities = {
      List      : ListEntity,
      Table     : TableEntity,
      Paragraph : ParagraphEntity,
      Grid      : GridEntity
    }

    this.usedEntitities = {}
  }

  use(entry) {
    if (typeof entry === 'string' || entry instanceof String) {
      this.usedEntitities[entry] = this.coreEntities[entry]
    } else {
      for (let key in entry) {
        this.usedEntitities[key] = function(core) {
          return entry[key]
        }
      }
    }

    return null;
  }

  create(name, options) {
    const klass = this.usedEntitities[name](core)
    const entity = new klass(options)

    return this.document.insert(entity)
  }
}
