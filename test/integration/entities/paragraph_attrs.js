describe('Integration', () => {
  let p

  before(() => {
    p = mekong.create('Paragraph')
    p.setText('Hello world!')
  })

  after(() => { clearContentWithEntities() })

  describe('attr', () => {
    it('can be set', () => {
      p.setAttr('id', 'test')
      p.setAttr('data-test', 'hello')
      expect(content()).to.be.equal('<p id="test" data-test="hello">Hello world!</p>')
    })

    it('can be removed', () => {
      p.removeAttr('id')
      p.setAttr('data-test', 'hello')
      expect(content()).to.be.equal('<p data-test="hello">Hello world!</p>')
    })

    it('can be updated', () => {
      p.setAttr('data-test', 'world')
      expect(content()).to.be.equal('<p data-test="world">Hello world!</p>')
    })

    it('can undo', () => {
      mekong.document.undo()
      expect(content()).to.be.equal('<p data-test="hello">Hello world!</p>')
    })

    it('can redo', () => {
      mekong.document.redo()
      expect(content()).to.be.equal('<p data-test="world">Hello world!</p>')
    })
  })
})
