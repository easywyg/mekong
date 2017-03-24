describe('Unit', () => {
  describe('document', () => {
    it('has no entities at beginning', () => {
      expect(mekong.document.state.entities.length).to.be.equal(0)
    })

    describe('#create', () => {
      after(() => { clearContentWithEntities(); })

      it('new entity', () => {
        let p = mekong.create('Paragraph')
        expect(mekong.document.state.entities.length).to.be.equal(1)
      })

      it('undo', () => {
        mekong.document.undo()
        expect(mekong.document.state.entities.length).to.be.equal(0)
      })

      it('redo', () => {
        mekong.document.redo()
        expect(mekong.document.state.entities.length).to.be.equal(1)
      })
    })
  })
})
