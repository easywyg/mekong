import Api from '../../src/api';

describe('Api', () => {
  after(function() { document.body.innerHTML = ''; });

  it('executes operation', () => {
    let api = new Api;
    let container = api.operate('Insert', 'RootContainer', { }, document.body).result;
    let result = api.operate('Insert', 'Paragraph', { text: 'hello' }, container);

    expect(result).to.include.keys('operation', 'result', 'reverse');
  });
});
