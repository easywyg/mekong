import Operation from '../operation.es6';

// A Insert Operation
export default class extends Operation {
  //constructor(entity, index = null) {
  constructor(entity) {
    super();

    this.entity = entity;
    //this.index = index;
  }

  execute(entities) {
    //return entities.add(this.entity, this.index);
    return entities.add(this.entity);
  }
}
