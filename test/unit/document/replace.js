describe('Unit', () => {
  describe('document', () => {
    describe('#replace', () => {
      after(() => { clearContentWithEntities(); })

      it('entity', () => {
        const p1 = mekong.create('Paragraph', { text: 'Hello world!' })
        const p2 = mekong.create('Paragraph', { text: 'Replacement' })
        mekong.document.replace(p1, p2)
        expect(mekong.document.state.entities.length).to.be.equal(1)
      })

      it('undo', () => {
        mekong.document.undo()
        expect(mekong.document.state.entities.length).to.be.equal(2)
      })

      it('redo', () => {
        mekong.document.redo()
        expect(mekong.document.state.entities.length).to.be.equal(1)
      })
    })
  })
})
