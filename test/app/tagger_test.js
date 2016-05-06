import Tagger from '../../src/app/tagger';
import {create} from 'virtual-dom';

describe('Tagger', () => {
  let tagger;

  it('#findGroups', () => {
    tagger = new Tagger('Hello world', [
      [ 'strong', 0, 5 ],
      [ 'span', 0, 5 ],
      [ 'em', 6, 11 ],
      [ 's', 2, 5 ],
      [ 's', 6, 8 ]
    ]);

    expect(tagger.findGroups()).to.deep.equal([[ 0, 5 ], [ 5, 6 ], [ 6, 11 ]]);
  });

  it('#group', () => {
    tagger = new Tagger('Hello world', [
      [ 'strong', 0, 5 ],
      [ 'span', 0, 5 ],
      [ 'em', 6, 11 ],
      [ 's', 2, 5 ],
      [ 's', 6, 8 ]
    ]);

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
    it('set tags properly 1', () => {
      tagger = new Tagger('Hello world', [
        [ 'strong', 0, 5 ],
        [ 'span', 0, 5 ],
        [ 'em', 6, 11 ],
        [ 's', 2, 5 ],
        [ 's', 6, 8 ]
      ]);

      expect(taggerHtml(tagger)).to.be.equal(
        "<strong><span>He<s>llo</s></span></strong> <em><s>wo</s>rld</em>"
      );
    });

    it('set tags properly 2', () => {
      tagger = new Tagger('jelly', [
        ['span', 0, 5],
        ['em', 2, 3],
        ['strong', 0, 5, { id: 'xxx', className: 'yyy' }]
      ]);

      expect(taggerHtml(tagger)).to.be.equal(
        '<strong id="xxx" class="yyy"><span>je<em>l</em>ly</span></strong>'
      );
    });

    it('set tags properly 3', () => {
      tagger = new Tagger('jelly', [
        ['span', 0, 5],
        ['s', 2, 3],
      ]);

      expect(taggerHtml(tagger)).to.be.equal('<span>je<s>l</s>ly</span>');
    });

    it('set tags properly 4', () => {
      tagger = new Tagger('jelly', [
        ['span', 0, 5],
        ['i', 0, 2],
        ['s', 2, 3],
      ]);

      expect(taggerHtml(tagger)).to.be.equal('<span><i>je</i><s>l</s>ly</span>');
    });

    it('set tags properly 5', () => {
      tagger = new Tagger('jelly', [
        ['span', 0, 5],
        ['i', 0, 2]
      ]);

      expect(taggerHtml(tagger)).to.be.equal('<span><i>je</i>lly</span>');
    });


    it('set tags properly 6', () => {
      tagger = new Tagger('jelly', [
        ['span', 0, 5]
      ]);

      expect(taggerHtml(tagger)).to.be.equal('<span>jelly</span>');
    });

    it('set tags properly 7', () => {
      tagger = new Tagger('jelly', [
        ['span', 2, 5]
      ]);

      expect(taggerHtml(tagger)).to.be.equal('je<span>lly</span>');
    });

    it('set tags properly 8', () => {
      tagger = new Tagger('jelly', [
        ['span', 0, 0]
      ]);

      expect(taggerHtml(tagger)).to.be.equal('jelly');
    });

    it('set tags properly 9', () => {
      tagger = new Tagger('Hello', [
        ['s', 2, 5]
      ]);

      expect(taggerHtml(tagger)).to.be.equal('He<s>llo</s>');
    });
  });
});
