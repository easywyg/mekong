describe('Integration', () => {
  describe('document', () => {
    describe('#replace', () => {
      after(() => { clearContentWithEntities(); })

      it('entity', () => {
        const p1 = mekong.create('Paragraph', { text: 'Hello world!' })
        const p2 = mekong.create('Paragraph', { text: 'Replacement' })
        mekong.document.replace(p1, p2)
        expect(content()).to.be.equal('<p>Replacement</p>')
      })

      it('undo', () => {
        mekong.document.undo()
        expect(content()).to.be.equal('<p>Replacement</p><p>Hello world!</p>')
      })

      it('redo', () => {
        mekong.document.redo()
        expect(content()).to.be.equal('<p>Replacement</p>')
      })
    })
  })
})
