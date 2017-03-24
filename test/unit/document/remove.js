describe('Unit', () => {
  describe('document', () => {
    describe('#remove', () => {
      after(() => { clearContentWithEntities(); })

      it('entity', () => {
        let p = mekong.create('Paragraph')
        mekong.document.remove(p)
        expect(mekong.document.state.entities.length).to.be.equal(0)
      })

      it('undo', () => {
        mekong.document.undo()
        expect(mekong.document.state.entities.length).to.be.equal(1)
      })

      it('redo', () => {
        mekong.document.redo()
        expect(mekong.document.state.entities.length).to.be.equal(0)
      })
    })
  })
})
