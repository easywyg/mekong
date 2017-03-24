describe('Integration', () => {
  let p

  before(() => { p = mekong.create('Paragraph') })
  after(() => { clearContentWithEntities() })

  describe('text', () => {
    it('can be set', () => {
      p.setText('Hello world!')
      expect(content()).to.be.equal('<p>Hello world!</p>')
    })

    it('can be changed whole', () => {
      p.setText('Yellow world!')
      expect(content()).to.be.equal('<p>Yellow world!</p>')
    })

    it('can be changed partially', () => {
      p.setText('peace', 7, 12)
      expect(content()).to.be.equal('<p>Yellow peace!</p>')
    })

    it('can be cleared', () => {
      p.setText('')
      expect(content()).to.be.equal('<p></p>')
    })

    it('can be cleared partially', () => {
      p.setText('Hello world!')
      p.setText('', 5, 12)
      expect(content()).to.be.equal('<p>Hello</p>')
    })

    it('can undo', () => {
      mekong.document.undo()
      expect(content()).to.be.equal('<p>Hello world!</p>')
    })

    it('can redo', () => {
      mekong.document.redo()
      expect(content()).to.be.equal('<p>Hello</p>')
    })
  })
})
