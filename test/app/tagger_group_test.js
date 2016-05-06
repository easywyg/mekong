import TaggerGroup from '../../src/app/tagger_group';
import {create} from 'virtual-dom';

// TODO: Если делаем ссылку в ссылке, то так быть не больжно, аналогично и с другими тегами
describe('TaggerGroup', () => {
  describe('#generateVTree', () => {
    it('works done 1', () => {
      let segments = [];

      let taggerGroup = new TaggerGroup([
        [ 'strong', 0, 5, { type: 1, attrs: {} } ],
        [ 'span', 0, 5, { type: 1, attrs: {} } ],
        [ 'He', 0, 2, { type: 3, attrs: {} } ],
        [ 's', 2, 5, { type: 1, attrs: {} } ],
        [ 'llo', 2, 5, { type: 3, attrs: {} } ]
      ]);

      expect(taggerGroupHtml(taggerGroup)).to.be.equal('<strong><span>He<s>llo</s></span></strong>');
    });

    it('works done 2', () => {
      let segments = [];

      let taggerGroup = new TaggerGroup([
        [ 'strong', 0, 5, { type: 1, attrs: {} } ],
        [ 'a', 0, 5, { type: 1, attrs: { href: '#' } } ],
        [ 'He', 0, 2, { type: 3, attrs: {} } ],
        [ 's', 2, 5, { type: 1, attrs: {} } ],
        [ 'llo', 3, 5, { type: 3, attrs: {} } ]
      ]);

      expect(taggerGroupHtml(taggerGroup)).to.be.equal('<a href="#"><strong>He<s>llo</s></strong></a>');
    });

    it('works done 3', () => {
      let taggerGroup = new TaggerGroup([
        [ 'Hello', 0, 0, { type: 3, attrs: {} } ]
      ]);

      expect(taggerGroupHtml(taggerGroup)).to.be.equal('Hello');
    });
  })
});
