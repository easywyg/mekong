// An entities collection class
export default class {
  constructor() {
    // Массив инстансов классов Entity
    this.entities = []
  }

  // Рендерим в html
  // Тк юзаем virtual-dom, то при изменении состояния он сразу перерендеривает
  // соответствующий кусок DOM. Нам походу не нужет этот метод ощпе.
  render() {
    this.entities.map((entity) => { entity.render() });
    return this;
  }
}
