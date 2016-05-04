import Operation from '../operation.js';

// A Select Operation
export default class extends Operation {
  constructor() {
    super();
  }

  get type() {
    return 'select'
  }
}
