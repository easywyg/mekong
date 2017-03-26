import SegmentCalculator from '../../../src/segments/segment_calculator';

const sortResult = (result) => {
  result.sort((a, b) => {
    if (a[1] > b[1] && a[0] > b[0]) return  1;
    if (a[1] < b[1] && a[0] < b[0]) return -1;

    return 0;
  })

  return result
}

describe('SegmentCalculator', () => {
  let sc;

  describe('#calculate', () => {
    // <strong><span>He<s>llo</s></span></strong> <em><s>wo</s>rld</em>
    it.only('calculates proper data with markup 1', () => {
      sc = new SegmentCalculator('Hello world', [
        ['strong', 0, 5],
        ['span', 0, 5],
        ['em', 5, 11],
        ['s', 2, 8]
      ]);

      let result = sc.calculate().map((x) => x.toJSON());

      expect(sortResult(result)).to.deep.equal([
        {
          attrs: {},
          data: "strong",
          end: 5,
          start: 0,
          type: "tag"
        }, {
          attrs: {},
          data: "span",
          end: 5,
          start: 0,
          type: "tag"
        }, {
          data: "He",
          end: 2,
          start: 0,
          type: "text"
        }, {
          attrs: {},
          data: "s",
          end: 8,
          start: 2,
          type: "tag"
        }, {
          data: "llo",
          end: 5,
          start: 2,
          type: "text"
        }, {
          data: " ",
          end: 6,
          start: 5,
          type: "whitespace"
        }, {
          attrs: {},
          data: "em",
          end: 11,
          start: 5,
          type: "tag"
        }, {
          data: "wo",
          end: 8,
          start: 6,
          type: "text"
        }, {
          data: "rld",
          end: 11,
          start: 8,
          type: "text"
        }
/*
        [ 'He', 0, 2, { type: 3, attrs: {} } ],
        [ 'em', 6, 11, { type: 1, attrs: {} } ],
        [ 's', 2, 5, { type: 1, attrs: {} } ],
        [ 'llo', 2, 5, { type: 3, attrs: {} } ],
        [ ' ', 5, 6, { type: 3, attrs: {} } ],
        [ 's', 6, 8, { type: 1, attrs: {} } ],
        [ 'wo', 6, 8, { type: 3, attrs: {} } ],
        [ 'rld', 8, 11, { type: 3, attrs: {} } ]*/
      ]);
    });

    it('calculates proper data with markup 2', () => {
      sc = new SegmentCalculator('Hello world', [
        ['strong', 0, 5],
        ['strong', 0, 11],
        ['strong', 3, 7]
      ]);

      let result = sc.calculate().map((x) => x.toJSON());

      expect(sortResult(result)).to.deep.equal([
        {
          attrs: {},
          data: 'strong',
          end: 11,
          start: 0
        }, {
          data: 'Hello',
          end: 5,
          start: 0
        }, {
          data: ' ',
          end: 6,
          start: 5
        }, {
          data: 'world',
          end: 11,
          start: 6
        }
      ]);
    });

    it('calculates proper data with markup 3', () => {
      sc = new SegmentCalculator('Hello world', [
        ['strong', 0, 5],
        ['strong', 0, 12]
      ]);

      let result = normalizer.calculate().map((x) => x.toJSON());

      expect(sortResult(result)).to.deep.equal([
        [ 'strong', 0, 12, { type: 1, attrs: {} } ],
        [ 'Hello', 0, 5, { type: 3, attrs: {} }],
        [ ' ', 5, 6, { type: 3, attrs: {} }],
        [ 'world', 6, 11, { type: 3, attrs: {} }]
      ]);
    });

    it('calculates proper data with markup 4', () => {
      sc = new SegmentCalculator('jelly', [
        ['span', 2, 5]
      ]);

      let result = sc.calculate().map((x) => x.toJSON());

      expect(sortResult(result)).to.deep.equal([
        {
          data: "je",
          end: 2,
          start: 0
        }, {
          attrs: {},
          data: "span",
          end: 5,
          start: 2
        }, {
          data: "lly",
          end: 5,
          start: 2
        }
      ]);
    });

    it('calculates proper data without markup', () => {
      sc = new SegmentCalculator('Hello world', []);
      let result = sc.calculate().map((x) => x.toJSON());

      expect(result).to.deep.equal([
        {
          data: 'Hello world',
          end: 11,
          start: 0
        }
      ]);
    });
  });
});
