describe('Integration', () => {
  describe('document', () => {
    describe('#mutate', () => {
      after(() => { clearContentWithEntities(); })

      it('to heading', () => {
        const p = mekong.create('Paragraph', { text: 'Hello' })
        mekong.document.mutate(p, 'Heading', 'h1', { class: 'lol yay' })
        expect(content()).to.be.equal('<h1 class="lol yay">Hello</h1>')
      })

      it('undo', () => {
        mekong.document.undo()
        expect(content()).to.be.equal('<p>Hello</p>')
      })

      it('redo', () => {
        mekong.document.redo()
        expect(content()).to.be.equal('<h1 class="lol yay">Hello</h1>')
      })
    })
  })
})
