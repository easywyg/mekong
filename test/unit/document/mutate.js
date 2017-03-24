describe('Unit', () => {
  describe('document', () => {
    describe('#mutate', () => {
      describe('allow', () => {
        afterEach(() => { clearContentWithEntities(); })

        it('paragraph to heading', () => {
          const p = mekong.create('Paragraph', { text: 'Hello' })
          mekong.document.mutate(p, 'Heading', 'h1', { class: 'lol yay' })
          expect(mekong.document.state.entities[0].type).to.be.equal('heading')
        })

        it('paragraph to preformatted', () => {
          const p = mekong.create('Paragraph', { text: 'Hello' })
          mekong.document.mutate(p, 'Preformatted', 'pre')
          expect(mekong.document.state.entities[0].type).to.be.equal('preformatted')
        })

        it('heading to paragraph', () => {
          const h1 = mekong.create('Heading', { text: 'Hello' })
          mekong.document.mutate(h1, 'Paragraph', 'p')
          expect(mekong.document.state.entities[0].type).to.be.equal('paragraph')
        })

        it('heading to preformatted', () => {
          const h1 = mekong.create('Heading', { text: 'Hello' })
          mekong.document.mutate(h1, 'Preformatted', 'pre')
          expect(mekong.document.state.entities[0].type).to.be.equal('preformatted')
        })

        it('preformatted to paragraph', () => {
          const pre = mekong.create('Preformatted', { text: 'Hello' })
          mekong.document.mutate(pre, 'Paragraph', 'p')
          expect(mekong.document.state.entities[0].type).to.be.equal('paragraph')
        })

        it('preformatted to heading', () => {
          const pre = mekong.create('Preformatted', { text: 'Hello' })
          mekong.document.mutate(pre, 'Heading', 'h1')
          expect(mekong.document.state.entities[0].type).to.be.equal('heading')
        })
      })

      describe('undo/redo', () => {
        after(() => { clearContentWithEntities(); })

        it('paragraph to heading', () => {
          const p = mekong.create('Paragraph', { text: 'Hello' })
          mekong.document.mutate(p, 'Heading', 'h1', { class: 'lol yay' })
          expect(mekong.document.state.entities[0].type).to.be.equal('heading')
        })

        it('undo', () => {
          mekong.document.undo()
          expect(mekong.document.state.entities[0].type).to.be.equal('paragraph')
        })

        it('redo', () => {
          mekong.document.redo()
          expect(mekong.document.state.entities[0].type).to.be.equal('heading')
        })
      })

      describe('restrict', () => {
        after(() => { clearContentWithEntities(); })

        it('to list', () => {
          const p = mekong.create('Paragraph', { text: 'Hello' })
          mekong.document.mutate(p, 'List', 'ul')
          expect(mekong.document.state.entities[0].type).to.be.equal('paragraph')
        })

        it('to table', () => {
          const p = mekong.create('Paragraph', { text: 'Hello' })
          mekong.document.mutate(p, 'Table', 'ul')
          expect(mekong.document.state.entities[0].type).to.be.equal('paragraph')
        })

        it('to grid', () => {
          const p = mekong.create('Paragraph', { text: 'Hello' })
          mekong.document.mutate(p, 'Table', 'ul')
          expect(mekong.document.state.entities[0].type).to.be.equal('paragraph')
        })
      })
    })
  })
})
