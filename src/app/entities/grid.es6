import Entity from '../entity.es6';
import ContainerEntity from './container.es6';
import View from '../views/grid.es6';

// A Grid Entity
export default class extends Entity {
  constructor(container = null) {
    super(container);

    this.opts = {
      attrs : {
        class: 'easywyg-grid'
      },
      // Определение контейнеров Entity.
      // Entity может содержать внутри себя один или несколько контейнеров.
      // В этих контейнерах могут находиться другие entities.
      //columns: []
      //  { attrs: { class: 'easywyg-grid-column' }, entities: [] }, // Первый контейнер
      //  { attrs: { class: 'easywyg-grid-column' }, entities: [] }  // Второй контейнер
      //]
    };

    this.view = new View();
  }

  // Добавляет контейнер колонки
  /*addColumn() {
    const column = new ContainerEntity();
    this.containers.push(column);

    return column;
  }

  // Возвращает контейнер колонки
  getColumn(index = 0) {

  }*/
}
