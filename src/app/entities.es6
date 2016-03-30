// An entities collection class
export default class {
  constructor() {
    // Массив инстансов классов Entity
    this.entities = []
    this.modified = false;
  }

  // Добавляем entity в массив entities
  // Функция должна возвращать индекс вставленного элемента.
  //add(entity, atIndex = null) {
  add(entity) {
    this.entities.push(entity);
    this.modified = true;
    this.render();
    return this;
  }

  move(index, container = null) { // ???

  }

  // Рендерим в html
  // Тк юзаем virtual-dom, то при изменении состояния он сразу перерендеривает
  // соответствующий кусок DOM. Нам походу не нужет этот метод ощпе.
  render() {
    //console.log(this.modified)
    //if (this.modified == false) {
    //  return this;
    //}

    this.entities.map((entity) => { entity.render() });
    this.modified = false;
    return this;
  }
}
