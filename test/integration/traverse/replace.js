describe('Integration Traverse', () => {
  let p1, p2

  before(() => {
    p1 = mekong.entity('Paragraph', { text: 'Hello world!' })
    p2 = mekong.entity('Paragraph', { text: 'Replacement' })
  })

  after(() => { clearContent() })

  describe('replace', () => {
    it('replace properly', () => {
      p2.replace(p1)
      expect(content()).to.be.equal('<p>Replacement</p>')
    })

    it('can undo', () => {
      mekong.document.undo()
      expect(content()).to.be.equal('<p>Hello world!</p>')
    })

    it('can redo', () => {
      mekong.document.redo()
      expect(content()).to.be.equal('<p>Replacement</p>')
    })
  })
})