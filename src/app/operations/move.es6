import Operation from '../operation.es6';

// A Move Operation
export default class extends Operation {
  constructor(entity, container) {
    super();

    this.entity = entity;
    this.container = container;
  }

  execute(entities) {
    this.entity.transfer(this.container);
    console.log('exec move')
    //return entities.add(this.entity);
  }
}
