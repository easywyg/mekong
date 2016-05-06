import ParagraphEntity from './entities/paragraph.js';
import ImageEntity from './entities/image.js';
import TableEntity from './entities/table.js';
import GridEntity from './entities/grid.js';
import GridColumnEntity from './entities/grid_column.js';
import SubstrateEntity from './entities/substrate.js';
import RootContainerEntity from './entities/root_container.js';

export default {
  Paragraph     : ParagraphEntity,
  Image         : ImageEntity,
  Grid          : GridEntity,
  Substrate     : SubstrateEntity,
  RootContainer : RootContainerEntity,
  GridColumn    : GridColumnEntity,
  Table         : TableEntity
};
