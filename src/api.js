'use strict';

import {create, diff, patch, VNode, VText} from './vdom/index.js';

// Core extensions
require('./ext.js');

// Lib
import mix from './lib/mix.js';
import EntityUtils from './lib/entity_utils.js';

// Core classes
import Entity from './entity.js';
import View from './view.js';
import Policy from './policy.js';
import Document from './document.js';
import Command from './undo_manager/command.js';

// Core entities
import ListEntity from './entities/list/export.js';
import TableEntity from './entities/table/export.js';
import ParagraphEntity from './entities/paragraph/export.js';
import GridEntity from './entities/grid/export.js';
import HeadingEntity from './entities/heading/export.js';
import PreformattedEntity from './entities/preformatted/export.js';

// Document commands
import CreateCommand from './commands/document/create.js';
import RemoveCommand from './commands/document/remove.js';
import MoveCommand from './commands/document/move.js';
import ReplaceCommand from './commands/document/replace.js';
import SplitCommand from './commands/document/split.js';
import JoinCommand from './commands/document/join.js';
import MutateCommand from './commands/document/mutate.js';
import LineBreakCommand from './commands/document/line_break.js';

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
  View,
  Policy,
  Command,
  Document,
  Lib : {
    Mix : mix,
    EntityUtils
  },
  Entities: {
    list: ListEntity,
    table: TableEntity,
    paragraph: ParagraphEntity,
    grid: GridEntity,
    heading: HeadingEntity,
    preformatted: PreformattedEntity
  },
  Command: {
    Document: {
      Create: CreateCommand,
      Remove: RemoveCommand,
      Move: MoveCommand,
      Replace: ReplaceCommand,
      Split: SplitCommand,
      Join: JoinCommand,
      Mutate: MutateCommand,
      LineBreak: LineBreakCommand
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
  }
};

export default class Mekong {
  constructor(root) {
    this.usedEntitities = {}
    this.document = new Document(this.usedEntitities, core, root)
  }

  use(entry) {
    if (String.isString(entry)) {
      this.usedEntitities[entry.toLowerCase()] = core.Entities[entry.toLowerCase()]
    } else {
      for (let key in entry) {
        this.usedEntitities[key.toLowerCase()] = (core) => { return entry[key.toLowerCase()] }
      }
    }

    return null;
  }

  create(name, options) {
    return this.document.create(name, options)
  }
}
