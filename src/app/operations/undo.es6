import Operation from '../operation.es6';

// A Undo Operation
export default class extends Operation {
  constructor() {
    super();
  }

  get type() {
    return 'undo'
  }
}
