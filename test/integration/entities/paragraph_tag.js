describe('Integration', () => {
  let p

  before(() => {
    p = mekong.entity('Paragraph', { tag: 'blockquote', attrs: { class: 'quote' } })
    p.setText('Hello world!')
  })

  after(() => { clearContent() })

  describe('tag', () => {
    it('initialized properly', () => {
      expect(content()).to.be.equal('<blockquote class="quote">Hello world!</blockquote>')
    })

    it('can be set', () => {
      p.setTag('pre')
      expect(content()).to.be.equal('<pre class="quote">Hello world!</pre>')
    })

    it('cannot be restricted', () => {
      p.setTag('span')
      expect(content()).to.be.equal('<pre class="quote">Hello world!</pre>')
    })

    it('can undo', () => {
      mekong.document.undo()
      expect(content()).to.be.equal('<blockquote class="quote">Hello world!</blockquote>')
    })

    it('can redo', () => {
      mekong.document.redo()
      expect(content()).to.be.equal('<pre class="quote">Hello world!</pre>')
    })
  })
})
