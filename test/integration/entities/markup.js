describe('Integration', () => {
  afterEach(() => { clearContentWithEntities() })

  describe('markup test', () => {
    it('set properly 10', () => {
      let p = mekong.create('Paragraph', { text: 'Hello world', markup: [['strong', 0, 11], ['span', 0, 11]] })
      expect(content()).to.be.equal('<p><strong><span>Hello world</span></strong></p>')
    })

    it('set properly 20', () => {
      let p = mekong.create('Paragraph', { text: 'Hello world', markup: [['strong', 0, 11]] })
      expect(content()).to.be.equal('<p><strong>Hello world</strong></p>')
    })

    it('set properly 30', () => {
      let p = mekong.create('Paragraph', { text: 'Hello world', markup: [['strong', 0, 11], ['span', 0, 5]] })
      expect(content()).to.be.equal('<p><strong><span>Hello</span> world</strong></p>')
    })

    it('set properly 40', () => {
      let p = mekong.create('Paragraph', { text: 'Hello world!', markup: [
        ['strong', 0, 5],
        ['em', 6, 11],
        ['u', 4, 7]
      ]})

      expect(content()).to.be.equal('<p><strong>Hell<u>o</u></strong> <em><u>w</u>orld</em>!</p>')
    })

    it('set properly 50', () => {
      let p = mekong.create('Paragraph', { text: 'Hello world', markup: [
        ['strong', 0, 5],
        ['strong', 0, 11],
        ['strong', 3, 7]
      ]})

      expect(content()).to.be.equal('<p><strong>Hello world</strong></p>')
    })
  })
})
