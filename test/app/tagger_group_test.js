import TaggerGroup from '../../src/app/tagger_group';
import {create} from 'virtual-dom';

// Helper function
let html = function(taggerGroup) {
  let div = document.createElement('div');
  taggerGroup.generateVTree().forEach((entry) => {
    div.appendChild(create(entry))
  });

  return div.innerHTML;
}

describe('TaggerGroup', () => {
  describe('#generateVTree', () => {
    it('works done 1', () => {
      let segments = [];

      let taggerGroup = new TaggerGroup([
        [ 'strong', 0, 5, { type: 1, attrs: {} } ],
        [ 'span', 0, 5, { type: 1, attrs: {} } ],
        [ 'He', 0, 2, { type: 3, attrs: {} } ],
        [ 's', 2, 5, { type: 1, attrs: {} } ],
        [ 'llo', 3, 5, { type: 3, attrs: {} } ]
      ]);

      expect(html(taggerGroup)).to.be.equal('<span><strong>He<s>llo</s></strong></span>');
    });

    it('works done 2', () => {
      let taggerGroup = new TaggerGroup([
        [ 'He', 0, 2, { type: 3, attrs: {} } ],
        [ 's', 2, 5, { type: 1, attrs: {} } ],
        [ 'llo', 3, 5, { type: 3, attrs: {} } ]
      ]);

      expect(html(taggerGroup)).to.be.equal('He<s>llo</s>');
    });

    /*it('works done 3', () => {
      let taggerGroup = new TaggerGroup([
        [ 'He', 0, 2, 't' ],
        [ 'llo', 3, 5, 't' ]
      ]);

      expect(html(taggerGroup)).to.be.equal('Hello');
    });*/
  })
});
