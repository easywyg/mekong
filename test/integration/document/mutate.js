describe('Integration', () => {
  describe('document', () => {
    describe('#mutate', () => {
      let p;

      before(() => { p = mekong.create('Paragraph', { text: 'Hello', markup: [['strong', 2, 4]] }) })
      after(() => { clearContentWithEntities(); })

      it('has p with markup before', () => {
        expect(content()).to.be.equal('<p>He<strong>ll</strong>o</p>')
      })

      it('to heading', () => {
        mekong.document.mutate(p, 'Heading', 'h1', { class: 'lol yay' })
        expect(content()).to.be.equal('<h1 class="lol yay">He<strong>ll</strong>o</h1>')
      })

      it('undo', () => {
        mekong.document.undo()
        expect(content()).to.be.equal('<p>He<strong>ll</strong>o</p>')
      })

      it('redo', () => {
        mekong.document.redo()
        expect(content()).to.be.equal('<h1 class="lol yay">He<strong>ll</strong>o</h1>')
      })
    })
  })
})
