describe('Integration', () => {
  describe('document', () => {
    describe('#split', () => {
      after(() => { clearContentWithEntities();  })

      it('paragraph into two', () => {
        let p = mekong.create('Paragraph', { text: 'Hello world!' })
        mekong.document.split(p, 5)
        expect(content()).to.be.equal('<p>Hello</p><p> world!</p>')
      })

      it('undo', () => {
        mekong.document.undo()
        expect(content()).to.be.equal('<p>Hello world!</p>')
      })

      it('redo', () => {
        mekong.document.redo()
        expect(content()).to.be.equal('<p>Hello</p><p> world!</p>')
      })
    })
  })
})
