import Builder from '../../../src/app/segments/builder';

// TODO: Если делаем ссылку в ссылке, то так быть не больжно, аналогично и с другими тегами
describe('Builder', () => {
  describe('#generate', () => {
    it('works done 1', () => {
      let segments = [];

      let builder = new Builder([
        [ 'strong', 0, 5, { type: 1, attrs: {} } ],
        [ 'span', 0, 5, { type: 1, attrs: {} } ],
        [ 'He', 0, 2, { type: 3, attrs: {} } ],
        [ 's', 2, 5, { type: 1, attrs: {} } ],
        [ 'llo', 2, 5, { type: 3, attrs: {} } ]
      ]);

      expect(builderHtml(builder)).to.be.equal('<strong><span>He<s>llo</s></span></strong>');
    });

    it('works done 2', () => {
      let segments = [];

      let builder = new Builder([
        [ 'strong', 0, 5, { type: 1, attrs: {} } ],
        [ 'a', 0, 5, { type: 1, attrs: { href: '#' } } ],
        [ 'He', 0, 2, { type: 3, attrs: {} } ],
        [ 's', 2, 5, { type: 1, attrs: {} } ],
        [ 'llo', 3, 5, { type: 3, attrs: {} } ]
      ]);

      expect(builderHtml(builder)).to.be.equal('<a href="#"><strong>He<s>llo</s></strong></a>');
    });

    it('works done 3', () => {
      let builder = new Builder([
        [ 'Hello', 0, 0, { type: 3, attrs: {} } ]
      ]);

      expect(builderHtml(builder)).to.be.equal('Hello');
    });
  })
});
