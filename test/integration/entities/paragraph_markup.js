describe('Integration', () => {
  let p

  before(() => {
    p = mekong.entity('Paragraph')
    p.setText('Hello world!')
  })

  after(() => { clearContent() })

  describe('markup', () => {
    it('can be set', () => {
      p.setMarkup('strong', 0, 5)
      p.setMarkup('em', 6, 11, { class: ['x1', 'x2'] })
      p.setMarkup('u', 4, 7)
      expect(content()).to.be.equal('<p><strong>Hell<u>o</u></strong> <em class="x1 x2"><u>w</u>orld</em>!</p>')
    })

    it('can change its attributes', () => {
      p.setMarkup('em', 6, 11, { class: 'x3', id: 'x4' })
      expect(content()).to.be.equal('<p><strong>Hell<u>o</u></strong> <em class="x3" id="x4"><u>w</u>orld</em>!</p>')
      mekong.document.undo()
    })

    // TODO: Этот тест нужно сделать юнит тестом к vdom_builder
    /*it('cannot be set with incorrect bounds', () => {
      p.setMarkup('strong', 1000, 5000)
      expect(content()).to.be.equal('<p><strong>Hell<u>o</u></strong> <em><u>w</u>orld</em>!</p>')
    })*/

    it('cannot be set with duplicate markup', () => {
      p.setMarkup('strong', 0, 5)
      expect(content()).to.be.equal('<p><strong>Hell<u>o</u></strong> <em class="x1 x2"><u>w</u>orld</em>!</p>')
    })

    it('can be removed', () => {
      p.removeMarkup('strong', 0, 5)
      expect(content()).to.be.equal('<p>Hell<u>o</u> <em class="x1 x2"><u>w</u>orld</em>!</p>')
    })

    it('ignore incorrect bounds when remove', () => {
      p.removeMarkup('u', 1000, 3000)
      expect(content()).to.be.equal('<p>Hell<u>o</u> <em class="x1 x2"><u>w</u>orld</em>!</p>')
    })

    it('ignore incorrect tag when remove', () => {
      p.removeMarkup('span', 4, 7)
      expect(content()).to.be.equal('<p>Hell<u>o</u> <em class="x1 x2"><u>w</u>orld</em>!</p>')
    })

    it('can undo', () => {
      mekong.document.undo()
      expect(content()).to.be.equal('<p><strong>Hell<u>o</u></strong> <em class="x1 x2"><u>w</u>orld</em>!</p>')
    })

    it('can redo', () => {
      mekong.document.redo()
      expect(content()).to.be.equal('<p>Hell<u>o</u> <em class="x1 x2"><u>w</u>orld</em>!</p>')
    })
  })
})
