import UpdateOperation from '../../../../src/app/operations/update/image';
import InsertOperation from '../../../../src/app/operations/insert';
import Entities from '../../../../src/app/entities';

describe('Image Update Operation', () => {
  after(function() { document.body.innerHTML = '' });

  describe('on Image entity', () => {
    let entities;
    let insertedEntity;

    beforeEach(function() {
      entities = new Entities();

      let container = document.body;
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

      expect(entities.entities[0].opts).to.deep.equal({
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
