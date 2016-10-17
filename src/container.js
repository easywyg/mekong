import Entity from './entity.js';

// Контейнер. Контейнеру можно задать, какие типы Entity он может содержать.
// Это нужно для того, чтобы в контейнер колонки грида нельзя было добавить другой
// грид, например. Хотя мля, почему бы и нет?
// Контейнер должен представлять собой элемент, который тоже можно отрендерить.
export default class extends Entity {
  constructor(options) {
    super(options);

    this._entities = [];
  }

  get tag() {
    return this.opts.tag
  }

  prev(entity) {
    const prevEntity = this._entities[this.findEntityIndex(entity) - 1];

    if (typeof prevEntity == 'undefined') {
      return null;
    }

    return prevEntity;
  }

  next(entity) {
    const nextEntity = this._entities[this.findEntityIndex(entity) + 1];

    if (typeof nextEntity == 'undefined') {
      return null;
    }

    return nextEntity;
  }

  swap(entity, anotherEntity) {
    const entityIndex = this.findEntityIndex(entity);
    const beforeEntityIndex = this.findEntityIndex(anotherEntity);

    this._entities[entityIndex] = anotherEntity;
    this._entities[beforeEntityIndex] = entity;

    return this;
  }

  findEntityIndex(entity) {
    return this._entities.findIndex((item, i) => {
      return item._id == entity._id
    });
  }

  addEntity(entity) {
    this._entities.push(entity);
    return this;
  }

  removeEntity(entity) {
    this._entities = this._entities.filter((item) => item._id !== entity._id);
    return this;
  }
}
