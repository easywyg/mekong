import Api from '../../src/app/api';

describe('Api', () => {
  it('executes operation', () => {
    let container = document.body;
    let api = new Api;
    let result = api.operate('Insert', 'Paragraph', { text: 'hello' }, container);

    expect(result).to.include.keys('operation', 'result', 'reverse');
  });
});
