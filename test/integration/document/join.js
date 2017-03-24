describe('Integration', () => {
  describe('document', () => {
    describe('#join', () => {
      after(() => { clearContentWithEntities() })

      it('two paragraphs into one', () => {
        let p1 = mekong.create('Paragraph', { text: 'Hello' })
        let p2 = mekong.create('Paragraph', { text: 'world!' })

        mekong.document.join(p1, p2)
        expect(content()).to.be.equal('<p>Helloworld!</p>')
      })

      it('undo', () => {
        mekong.document.undo()
        expect(content()).to.be.equal('<p>Hello</p><p>world!</p>')
      })

      it('redo', () => {
        mekong.document.redo()
        expect(content()).to.be.equal('<p>Helloworld!</p>')
      })
    })

    describe('#join with markup', () => {
      after(() => { clearContentWithEntities() })

      it('two paragraphs with markup into one', () => {
        let p1 = mekong.create('Paragraph', { text: 'Hello', markup: [['strong', 0, 5]] })
        let p2 = mekong.create('Paragraph', { text: 'world!', markup: [['strong', 0, 3]] })

        mekong.document.join(p1, p2)
        expect(content()).to.be.equal('<p><strong>Hellowor</strong>ld!</p>')
      })

      it('undo', () => {
        mekong.document.undo()
        expect(content()).to.be.equal('<p><strong>Hello</strong></p><p><strong>wor</strong>ld!</p>')
      })

      it('redo', () => {
        mekong.document.redo()
        expect(content()).to.be.equal('<p><strong>Hellowor</strong>ld!</p>')
      })
    })
  })
})


