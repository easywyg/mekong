describe('Integration', () => {
  describe('document', () => {
    it('has no entities at beginning', () => {
      expect(mekong.document.state.entities.length).to.be.equal(0)
    })

    describe('#insert', () => {
      after(() => { clearContent(); mekong.document.state.entities = [] })

      it('new entity', () => {
        let p = mekong.create('Paragraph')
        expect(mekong.document.state.entities.length).to.be.equal(1)
      })

      it('undo new entity', () => {
        mekong.document.undo()
        expect(mekong.document.state.entities.length).to.be.equal(0)
      })

      it('redo new entity', () => {
        mekong.document.redo()
        expect(mekong.document.state.entities.length).to.be.equal(1)
      })
    })

    describe('#remove', () => {
      after(() => { clearContent(); mekong.document.state.entities = [] })

      it('entity', () => {
        let p = mekong.create('Paragraph')
        mekong.document.remove(p)
        expect(mekong.document.state.entities.length).to.be.equal(0)
      })

      it('undo remove entity', () => {
        mekong.document.undo()
        expect(mekong.document.state.entities.length).to.be.equal(1)
      })

      it('redo remove entity', () => {
        mekong.document.redo()
        expect(mekong.document.state.entities.length).to.be.equal(0)
      })
    })

    describe('#replace', () => {
      after(() => { clearContent(); mekong.document.state.entities = [] })

      it('entity', () => {
        const p1 = mekong.create('Paragraph', { text: 'Hello world!' })
        const p2 = mekong.create('Paragraph', { text: 'Replacement' })
        mekong.document.replace(p1, p2)
        expect(mekong.document.state.entities.length).to.be.equal(1)
      })

      it('undo replace entity', () => {
        mekong.document.undo()
        expect(mekong.document.state.entities.length).to.be.equal(2)
      })

      it('redo replace entity', () => {
        mekong.document.redo()
        expect(mekong.document.state.entities.length).to.be.equal(1)
      })
    })

    describe('#move', () => {
      after(() => { clearContent(); mekong.document.state.entities = [] })

      xit('entity', () => {

      })

      xit('undo move entity', () => {

      })

      xit('redo move entity', () => {

      })
    })
  })
})
/*
  before(() => {
    p1 = mekong.create('Paragraph', { text: 'Hello world!' })
    p2 = mekong.create('Paragraph', { text: 'Replacement' })
  })

  after(() => { clearContent() })

  describe('replace', () => {
    it('replace properly', () => {
      mekong.document.replace(p1, p2)
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
*/
