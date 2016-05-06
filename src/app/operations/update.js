import EmbedUpdate from './update/embed.js';
import FileUpdate from './update/file.js';
import GridUpdate from './update/grid.js';
import GridColumnUpdate from './update/grid_column.js';
import ImageUpdate from './update/image.js';
import ListUpdate from './update/list.js';
import ParagraphUpdate from './update/paragraph.js';
import RootContainerUpdate from './update/root_container.js';
import SubstrateUpdate from './update/substrate.js';
import TableUpdate from './update/table.js';

// Entity-to-operation mapping
const MAP = {
  embed: EmbedUpdate,
  file: FileUpdate,
  grid: GridUpdate,
  grid_column: GridColumnUpdate,
  image: ImageUpdate,
  list: ListUpdate,
  paragraph: ParagraphUpdate,
  root_container: RootContainerUpdate,
  substrate: SubstrateUpdate,
  table: TableUpdate
}

// Класс-фабрика-прокси для операций Update
export default class {
  // Принимает инстанс сущности и опции
  constructor(entity, opts) {
    const klass = MAP[entity.type];

    if (typeof klass == 'undefined') {
      throw new Error("Cannot find concrete operation class!");
    }

    this.operation = new klass(entity, opts);
  }

  execute(entities) {
    return this.operation.execute(entities);
  }
}
