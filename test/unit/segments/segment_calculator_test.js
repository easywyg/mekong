import SegmentCalculator from '../../../src/segments/segment_calculator';

// <strong><span>He<s>llo</s></span></strong> <em><s>wo</s>rld</em>
// <strong>Hell<u>o <em>world!</em></u></strong>
// <strong><span>Hello</span> world</strong>
// <strong>Hello world</strong>
// <strong><span>Hello world</span></strong>
describe('SegmentCalculator', () => {
  let sc;

  describe('#calculate', () => {
    // <strong><span>He<s>llo</s></span></strong> <em><s>wo</s>rld</em>
    it('calculates proper data with markup 1', () => {
      sc = new SegmentCalculator('Hello world', [
        ['strong', 0, 5],
        ['span', 0, 5],
        ['em', 6, 11],
        ['s', 2, 8]
      ]);

      let result = sc.calculate().map((x) => x.toJSON());

      expect(result).to.deep.equal([
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
          end: 5,
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
          start: 6,
          type: "tag"
        }, {
          attrs: {},
          data: "s",
          end: 8,
          start: 6,
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
      ]);
    });

    it('calculates proper data with markup 2', () => {
      sc = new SegmentCalculator('Hello world', [
        ['strong', 0, 5],
        ['strong', 0, 11],
        ['strong', 3, 7]
      ]);

      let result = sc.calculate().map((x) => x.toJSON());

      expect(result).to.deep.equal([
        {
          attrs: {},
          data: "strong",
          end: 11,
          start: 0,
          type: "tag"
        }, {
          data: "Hello",
          end: 5,
          start: 0,
          type: "text"
        }, {
          data: " ",
          end: 6,
          start: 5,
          type: "whitespace"
        }, {
          data: "world",
          end: 11,
          start: 6,
          type: "text"
        }
      ]);
    });

    it('calculates proper data with markup 3', () => {
      sc = new SegmentCalculator('Hello world', [
        ['strong', 0, 5],
        ['strong', 0, 12]
      ]);

      let result = sc.calculate().map((x) => x.toJSON());

      expect(result).to.deep.equal([
        {
          attrs: {},
          data: "strong",
          end: 12,
          start: 0,
          type: "tag"
        }, {
          data: "Hello",
          end: 5,
          start: 0,
          type: "text"
        }, {
          data: " ",
          end: 6,
          start: 5,
          type: "whitespace"
        }, {
          data: "world",
          end: 11,
          start: 6,
          type: "text"
        }
      ]);
    });

    it('calculates proper data with markup 4', () => {
      sc = new SegmentCalculator('jelly', [
        ['span', 2, 5]
      ]);

      let result = sc.calculate().map((x) => x.toJSON());

      expect(result).to.deep.equal([
        {
          data: "je",
          end: 2,
          start: 0,
          type: "text"
        }, {
          attrs: {},
          data: "span",
          end: 5,
          start: 2,
          type: "tag"
        }, {
          data: "lly",
          end: 5,
          start: 2,
          type: "text"
        }
      ]);
    });

    it('calculates proper data with markup 5', () => {
      sc = new SegmentCalculator('Hello world!', [
        ['em', 6, 11],
        ['u', 4, 7]
      ]);

      let result = sc.calculate().map((x) => x.toJSON());
      expect(result).to.deep.equal([
        // Hell<u>o</u> <em><u>w</u>orld</em>! <-- what is gonna be
        {
          "data": "Hell",
          "end": 4,
          "start": 0,
          "type": "text"
        }, {
          "attrs": {},
          "data": "u",
          "end": 5,
          "start": 4,
          "type": "tag"
        }, {
          "data": "o",
          "end": 5,
          "start": 4,
          "type": "text"
        }, {
          "data": " ",
          "end": 6,
          "start": 5,
          "type": "whitespace"
        }, {
          "attrs": {},
          "data": "em",
          "end": 11,
          "start": 6,
          "type": "tag"
        }, {
          "attrs": {},
          "data": "u",
          "end": 7,
          "start": 6,
          "type": "tag"
        }, {
          "data": "w",
          "end": 7,
          "start": 6,
          "type": "text"
        }, {
          "data": "orld",
          "end": 11,
          "start": 7,
          "type": "text"
        }, {
          "data": "!",
          "end": 12,
          "start": 11,
          "type": "text"
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
          start: 0,
          type: "text"
        }
      ]);
    });
  });
});
