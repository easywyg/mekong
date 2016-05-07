import EmbedEntity from './entities/embed.js';
import GridEntity from './entities/grid.js';
import GridColumnEntity from './entities/grid_column.js';
import ImageEntity from './entities/image.js';
import ListEntity from './entities/list.js';
import ParagraphEntity from './entities/paragraph.js';
import RootContainerEntity from './entities/root_container.js';
import SubstrateEntity from './entities/substrate.js';
import TableEntity from './entities/table.js';

export default {
  Embed         : EmbedEntity,
  Grid          : GridEntity,
  GridColumn    : GridColumnEntity,
  Image         : ImageEntity,
  List          : ListEntity,
  Paragraph     : ParagraphEntity,
  RootContainer : RootContainerEntity,
  Substrate     : SubstrateEntity,
  Table         : TableEntity
};
