import Operation from '../operation.es6';

// A Select Operation
export default class extends Operation {
  constructor() {
    super();
  }

  get type() {
    return 'select'
  }
}
