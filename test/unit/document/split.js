describe('Unit', () => {
  describe('document', () => {
    describe('#split', () => {
      after(() => { clearContentWithEntities();  })

      it('paragraph into two', () => {
        let p = mekong.create('Paragraph', { text: 'Hello world!' })
        mekong.document.split(p, 5)
        expect(mekong.document.state.entities.length).to.be.equal(2)
      })

      it('undo', () => {
        mekong.document.undo()
        expect(mekong.document.state.entities.length).to.be.equal(1)
      })

      it('redo', () => {
        mekong.document.redo()
        expect(mekong.document.state.entities.length).to.be.equal(2)
      })
    })
  })
})
