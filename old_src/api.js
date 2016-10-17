'use strict';

// Core extensions
require('./ext.js');

// Entities
import RootContainerEntity from './entities/root_container.js';
import ParagraphEntity from './entities/paragraph.js';

export default {
  Entity: {
    RootContainer: RootContainerEntity,
    Paragraph: ParagraphEntity
  }
};
