import UpdateOperation from '../../../../src/operations/update';
import InsertOperation from '../../../../src/operations/insert';
import Entities from '../../../../src/entities';

// Надо перед каждым тестом создавать контейнер и entities, а после каждого теста очищать боди
describe('Image Update Operation', () => {
  after(function() { document.body.innerHTML = '' });

  describe('on Image entity', () => {
    describe('updates plain caption text', () => {
      let insertedEntity, entities;

      beforeEach(function() {
        entities  = new Entities();
        let container = (new InsertOperation('RootContainer', {}, document.body)).execute(entities);
        let insertOperation = new InsertOperation('Image', { caption : 'hello' }, container);
        insertedEntity = insertOperation.execute(entities);
      });

      it('add new caption to point', () => {
        let operation = new UpdateOperation(insertedEntity, { caption: 'p', start: 0, end: 0 });
        operation.execute(entities);

        expect(entities.entities[1].opts.caption).to.be.equal('phello');
      });

      it('updates caption from point to point', () => {
        let operation = new UpdateOperation(insertedEntity, { caption: 'y', start: 0, end: 2 });
        operation.execute(entities);
        expect(entities.entities[1].opts.caption).to.be.equal('yllo');
      });

      it('deletes caption from point to point', () => {
        let operation = new UpdateOperation(insertedEntity, { caption: '', start: 2, end: 4 });
        operation.execute(entities);
        expect(entities.entities[1].opts.caption).to.be.equal('heo');
      });

      it('does nothing with caption if start or end is wrong', () => {
        let operation = new UpdateOperation(insertedEntity, { caption: 'lol', start: 200, end: 400 });
        operation.execute(entities);
        expect(entities.entities[1].opts.caption).to.be.equal('hello');
      });

      it('does nothing with caption if start or end is null', () => {
        let operation = new UpdateOperation(insertedEntity, { caption: 'yay', start: null, end: null });
        operation.execute(entities);
        expect(entities.entities[1].opts.caption).to.be.equal('hello');
      });

      it('replaces whole caption if start or end is not defined', () => {
        let operation = new UpdateOperation(insertedEntity, { caption: 'yay' });
        operation.execute(entities);
        expect(entities.entities[1].opts.caption).to.be.equal('yay');
      });

      it('does nothing at all if opts are empty', () => {
        let operation = new UpdateOperation(insertedEntity, {});
        operation.execute(entities);
        expect(entities.entities[1].opts.caption).to.be.equal('hello');
      });
    });

    describe('html markup', () => {
      let insertedEntity, entities, container;

      beforeEach(function() {
        entities  = new Entities();
        container = (new InsertOperation('RootContainer', {}, document.body)).execute(entities);
        let insertOperation = new InsertOperation('Image', {
          caption : 'Once upon a time',
          attrs   : {
            figure: {
              class: 'easywyg-figure'
            },
            img: {},
            figcaption: {},
            a: {}
          },
          markup  : [
            ['strong', 5, 9]
          ]
        }, container);

        insertedEntity = insertOperation.execute(entities);
      });

      it('updates image options', () => {
        let opts = {
          caption : 'Once upon a time!',
          attrs   : {
            figure: {
              class: 'easywyg-figure easywyg-figure-left'
            },
            img: {
              border: 0
            },
            figcaption: {
              data: {
                id: 'xxx'
              }
            },
            a: {
              href: '#'
            }
          },
          markup  : [
            ['em', 0, 4]
          ]
        };

        let operation = new UpdateOperation(insertedEntity, opts);
        operation.execute(entities);

        expect(entities.entities[1].opts).to.deep.equal({
          caption : 'Once upon a time!',
          attrs   : {
            figure: {
              class: 'easywyg-figure easywyg-figure-left'
            },
            img: {
              border: 0
            },
            figcaption: {
              data: {
                id: 'xxx'
              }
            },
            a: {
              href: '#'
            }
          },
          markup  : [
            ['strong', 5, 9],
            ['em', 0, 4]
          ]
        });
      });
    });
  });
});
