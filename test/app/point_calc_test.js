import PointCalc from '../../src/app/point_calc';

describe('PointCalc', () => {
  let calc;

  describe('#calculate', () => {
    beforeEach(function() {
      calc = new PointCalc('Hello world', [
        ['strong', 0, 5],
        ['span', 0, 5],
        ['em', 5, 11],
        ['s', 2, 8]
      ]);
    });

    // <strong><span>He<s>llo</s></span></strong> <em><s>wo</s>rld</em>
    it('calculates proper data', () => {
      let result = calc.calculate();
      result.sort((a, b) => {
        if (a[1] > b[1] && a[0] > b[0]) return  1;
        if (a[1] < b[1] && a[0] < b[0]) return -1;

        return 0;
      });

      expect(result).to.deep.equal([
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
  });
});
