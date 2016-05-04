import Operation from '../operation.js';

// A Undo Operation
export default class extends Operation {
  constructor() {
    super();
  }

  get type() {
    return 'undo'
  }
}
