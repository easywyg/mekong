describe('Unit', () => {
  describe('document', () => {
    describe('#join', () => {
      after(() => { clearContentWithEntities(); })

      it('two paragraphs into one', () => {
        let p1 = mekong.create('Paragraph', { text: 'Hello' })
        let p2 = mekong.create('Paragraph', { text: 'world!' })

        mekong.document.join(p1, p2)
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
