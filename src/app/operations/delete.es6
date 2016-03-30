import Operation from '../operation.es6';

// A Delete Operation
export default class extends Operation {
  constructor(entity) {
    super();

    this.entity = entity;
  }

  execute(entities) {
    this.entity.delete();
    console.log('exec delete')
  }
}
