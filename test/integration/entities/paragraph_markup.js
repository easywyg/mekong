describe('Integration', () => {
  let p

  before(() => {
    p = mekong.create('Paragraph')
    p.setText('Hello world!')
  })

  after(() => { clearContentWithEntities() })

  describe('markup', () => {
    it('can be set', () => {
      p.setMarkup('strong', 0, 5)
      p.setMarkup('em', 6, 11, { class: ['x1', 'x2'] })
      p.setMarkup('u', 4, 7)

      expect(content()).to.be.equal('<p><strong>Hell<u>o</u></strong> <em class="x1 x2"><u>w</u>orld</em>!</p>')
    })

    it('can be removed', () => {
      p.setMarkup('strong', 0, 5)
      p.setMarkup('em', 6, 11, { class: ['x1', 'x2'] })
      p.setMarkup('u', 4, 7)
      p.removeMarkup('strong', 0, 5)

      expect(content()).to.be.equal('<p>Hell<u>o</u> <em class="x1 x2"><u>w</u>orld</em>!</p>')
      mekong.document.undo()
    })

    it('cannot be set with duplicate markup', () => {
      p.setMarkup('strong', 0, 5)
      expect(content()).to.be.equal('<p><strong>Hell<u>o</u></strong> <em class="x1 x2"><u>w</u>orld</em>!</p>')
    })

    it('ignore incorrect bounds when remove', () => {
      p.removeMarkup('u', 1000, 3000)
      expect(content()).to.be.equal('<p><strong>Hell<u>o</u></strong> <em class="x1 x2"><u>w</u>orld</em>!</p>')
    })

    it('ignore incorrect tag when remove', () => {
      p.removeMarkup('span', 4, 7)
      expect(content()).to.be.equal('<p><strong>Hell<u>o</u></strong> <em class="x1 x2"><u>w</u>orld</em>!</p>')
    })

    it('cannot set restricted tags', () => {
      p.setMarkup('pre', 0, 5)
      expect(content()).to.be.equal('<p><strong>Hell<u>o</u></strong> <em class="x1 x2"><u>w</u>orld</em>!</p>')
    })

    it('can undo', () => {
      mekong.document.undo()
      expect(content()).to.be.equal('<p><strong>Hello</strong> <em class="x1 x2">world</em>!</p>')
    })

    it('can redo', () => {
      mekong.document.redo()
      expect(content()).to.be.equal('<p><strong>Hell<u>o</u></strong> <em class="x1 x2"><u>w</u>orld</em>!</p>')
    })

    xit('can change its attributes', () => {
      /*p.updateMarkupAttrs('em', 6, 11, { class: 'x3', id: 'x4' })
      expect(content()).to.be.equal('<p><strong>Hell<u>o</u></strong> <em class="x3" id="x4"><u>w</u>orld</em>!</p>')
      mekong.document.undo()*/
    })
  })
})
