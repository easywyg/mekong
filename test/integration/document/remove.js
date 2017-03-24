describe('Integration', () => {
  describe('document', () => {
    describe('#remove', () => {
      after(() => { clearContentWithEntities(); })

      it('entity', () => {
        let p = mekong.create('Paragraph')
        mekong.document.remove(p)
        expect(content()).to.be.equal('')
      })

      it('undo', () => {
        mekong.document.undo()
        expect(content()).to.be.equal('<p></p>')
      })

      it('redo', () => {
        mekong.document.redo()
        expect(content()).to.be.equal('')
      })
    })
  })
})
