describe('Integration', () => {
  describe('document', () => {
    describe('#create', () => {
      after(() => { clearContentWithEntities(); })

      it('new entity', () => {
        let p = mekong.create('Paragraph')
        expect(content()).to.be.equal('<p></p>')
      })

      it('undo', () => {
        mekong.document.undo()
        expect(content()).to.be.equal('')
      })

      it('redo', () => {
        mekong.document.redo()
        expect(content()).to.be.equal('<p></p>')
      })
    })
  })
})
