import View from '../view.es6';
//import Container from '../container.es6';

// A Grid View
export default class extends View {
  build(entity) {
    //let columns = [];

    /*entity.containers.forEach((container) => {
      const column = container.view.build(container);
      columns.push(column);

      // TODO: После рендеринга column должен обновляться columnEntry,
      // ему должна ставиться ссылка на узел DOM
    });*/

    return this.vnode('div', { attributes: entity.attrs }, []);
  }
}
