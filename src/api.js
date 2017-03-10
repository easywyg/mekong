'use strict';

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
import Particle from './particle.js';
import Document from './document.js';

// Default entities
import ListEntity from './entities/list/export.js';
import TableEntity from './entities/table/export.js';
import ParagraphEntity from './entities/paragraph/export.js';

// Mixins
import TextMethods from './mixins/text_methods.js';
import MarkupMethods from './mixins/markup_methods.js';
import AttrMethods from './mixins/attr_methods.js';
import TagMethods from './mixins/tag_methods.js';

const core = {
  Entity      : Entity,
  Container   : Container,
  View        : View,
  Policy      : Policy,
  Particle    : Particle,
  Lib : {
    Mix : mix,
    EntityUtils : EntityUtils
  },
  Mixin : {
    TextMethods   : TextMethods,
    MarkupMethods : MarkupMethods,
    AttrMethods   : AttrMethods,
    TagMethods    : TagMethods
  }
};

export default class Mekong {
  constructor(root) {
    this.document = new Document(root)

    this.coreEntities = {
      List      : ListEntity,
      Table     : TableEntity,
      Paragraph : ParagraphEntity
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
