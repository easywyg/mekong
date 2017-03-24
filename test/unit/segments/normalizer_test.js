import Normalizer from '../../../src/segments/normalizer';

const sortResult = (result) => {
  result.sort((a, b) => {
    if (a[1] > b[1] && a[0] > b[0]) return  1;
    if (a[1] < b[1] && a[0] < b[0]) return -1;

    return 0;
  })

  return result
}

describe('Normalizer', () => {
  let normalizer;

  describe('#calculate', () => {
    // <strong><span>He<s>llo</s></span></strong> <em><s>wo</s>rld</em>
    it('calculates proper data with markup 1', () => {
      normalizer = new Normalizer('Hello world', [
        ['strong', 0, 5],
        ['span', 0, 5],
        ['em', 5, 11],
        ['s', 2, 8]
      ]);

      let result = normalizer.calculate();

      expect(sortResult(result)).to.deep.equal([
        [ 'strong', 0, 5, { type: 1, attrs: {} } ],
        [ 'span', 0, 5, { type: 1, attrs: {} } ],
        [ 'He', 0, 2, { type: 3, attrs: {} } ],
        [ 'em', 6, 11, { type: 1, attrs: {} } ],
        [ 's', 2, 5, { type: 1, attrs: {} } ],
        [ 'llo', 2, 5, { type: 3, attrs: {} } ],
        [ ' ', 5, 6, { type: 3, attrs: {} } ],
        [ 's', 6, 8, { type: 1, attrs: {} } ],
        [ 'wo', 6, 8, { type: 3, attrs: {} } ],
        [ 'rld', 8, 11, { type: 3, attrs: {} } ]
      ]);
    });

    it('calculates proper data with markup 2', () => {
      normalizer = new Normalizer('Hello world', [
        ['strong', 0, 5],
        ['strong', 0, 11],
        ['strong', 3, 7]
      ]);

      let result = normalizer.calculate();

      expect(sortResult(result)).to.deep.equal([
        [ 'strong', 0, 11, { type: 1, attrs: {} } ],
        [ 'Hello', 0, 5, { type: 3, attrs: {} }],
        [ ' ', 5, 6, { type: 3, attrs: {} }],
        [ 'world', 6, 11, { type: 3, attrs: {} }]
      ]);
    });

    it('calculates proper data with markup 3', () => {
      normalizer = new Normalizer('Hello world', [
        ['strong', 0, 5],
        ['strong', 0, 12]
      ]);

      let result = normalizer.calculate();

      //console.log(sortResult(result))

      expect(sortResult(result)).to.deep.equal([
        [ 'strong', 0, 12, { type: 1, attrs: {} } ],
        [ 'Hello', 0, 5, { type: 3, attrs: {} }],
        [ ' ', 5, 6, { type: 3, attrs: {} }],
        [ 'world', 6, 11, { type: 3, attrs: {} }]
      ]);
    });

    it('calculates proper data with markup 4', () => {
      normalizer = new Normalizer('jelly', [
        ['span', 2, 5]
      ]);

      let result = normalizer.calculate();

      expect(sortResult(result)).to.deep.equal([
        [ 'je', 0, 2, { type: 3, attrs: {} } ],
        [ 'span', 2, 5, { type: 1, attrs: {} } ],
        [ 'lly', 2, 5, { type: 3, attrs: {} } ]
      ]);
    });

    it('calculates proper data without markup', () => {
      normalizer = new Normalizer('Hello world', []);
      let result = normalizer.calculate();

      expect(result).to.deep.equal([
        ['Hello world', 0, 11, { type: 3, attrs: {} }]
      ]);
    });
  });
});
