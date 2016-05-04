import Tagger from '../../src/app/tagger';

describe('Tagger', () => {
  let tagger;

  beforeEach(function() {
    tagger = new Tagger('Hello world', [
      [ 'strong', 0, 5 ],
      [ 'span', 0, 5 ],
      [ 'em', 6, 11 ],
      [ 's', 2, 5 ],
      [ 's', 6, 8 ]
    ]);
  });

  it('#findGroups', () => {
    expect(tagger.findGroups()).to.deep.equal([[ 0, 5 ], [ 5, 6 ], [ 6, 11 ]]);
  });

  it('#group', () => {
    expect(tagger.group()).to.deep.equal([
      [
        [ 'strong', 0, 5, { type: 1, attrs: {} } ],
        [ 'span', 0, 5, { type: 1, attrs: {} } ],
        [ 'He', 0, 2, { type: 3, attrs: {} } ],
        [ 's', 2, 5, { type: 1, attrs: {} } ],
        [ 'llo', 2, 5, { type: 3, attrs: {} } ]
      ],
      [
        [ ' ', 5, 6, { type: 3, attrs: {} } ]
      ],
      [
        [ 'em', 6, 11, { type: 1, attrs: {} } ],
        [ 's', 6, 8, { type: 1, attrs: {} } ],
        [ 'wo', 6, 8, { type: 3, attrs: {} } ],
        [ 'rld', 8, 11, { type: 3, attrs: {} } ]
      ]
    ]);
  });

  describe('#process', () => {
    it('set tags properly', () => {
      //let result = "<strong><span>He<s>llo</s></span></strong> <em><s>wo</s>rld</em>";
      let result = "<span><strong>He<s>llo</s></strong></span> <s>wo<em>rld</em></s>";
      expect(tagger.process()).to.be.equal(result);
    });
  });
});
