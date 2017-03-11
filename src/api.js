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

// Commands
import InsertCommand from './commands/insert.js';
import RemoveCommand from './commands/remove.js';
import MoveCommand from './commands/move.js';
import ReplaceCommand from './commands/replace.js';
import AttrCommand from './commands/attr.js';
import RemoveAttrCommand from './commands/remove_attr.js';
import MarkupCommand from './commands/markup.js';
import RemoveMarkupCommand from './commands/remove_markup.js';
import TagCommand from './commands/tag.js';
import TextCommand from './commands/text.js';

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
    Insert: InsertCommand,
    Remove: RemoveCommand,
    Move: MoveCommand,
    Replace: ReplaceCommand,
    Attr: AttrCommand,
    RemoveAttr: RemoveAttrCommand,
    Markup: MarkupCommand,
    RemoveMarkup: RemoveMarkupCommand,
    Tag: TagCommand,
    Text: TextCommand
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
    const entity = new klass(options);

    return this.document.insert(entity)
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
