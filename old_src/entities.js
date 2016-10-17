// An entities collection class
export default class {
  constructor() {
    // Массив инстансов классов Entity
    this.entities = []
  }

  delete(entity) {
    this.entities.splice(entity.index, 1);
    this.updateIndexes();
  }

  updateIndexes() {
    // Обновляем индекс у всех entities
    this.entities.map((entity, index) => {
      entity.index = index;
      return entity;
    })
  }

  // Рендерим в html
  // Тк юзаем virtual-dom, то при изменении состояния он сразу перерендеривает
  // соответствующий кусок DOM. Нам походу не нужет этот метод ощпе.
  render() {
    this.entities.map((entity) => { entity.render() });
    return this;
  }
}
