import UpdateOperation from '../../../../src/operations/update';
import InsertOperation from '../../../../src/operations/insert';
import Entities from '../../../../src/entities';

describe('Integration: Image', () => {
  let entities;
  let container;
  let insertOperation;
  let insertedEntity;

  afterEach(function() { document.body.innerHTML = '' });
  beforeEach(function() {
    entities = new Entities();
    container = (new InsertOperation('RootContainer', {}, document.body)).execute(entities);
    insertOperation = new InsertOperation('Image', {
      caption : 'Once upon a time',
      attrs   : {
        figure: {
          class: 'easywyg-figure'
        },
        img: {
          src: 'https://goo.gl/VwjxyL'
        },
        figcaption: {},
        a: {}
      },
      markup  : [
        ['strong', 5, 9]
      ]
    }, container);
    insertedEntity = insertOperation.execute(entities);
  })

  it('insert html', () => {
    expect(document.body.innerHTML).to.be.equal(
      '<figure class="easywyg-figure"><img src="https://goo.gl/VwjxyL"><figcaption>Once <strong>upon</strong> a time</figcaption></figure>'
    );
  });

  it('update html', () => {
    let operation = new UpdateOperation(insertedEntity, {
      caption : 'Once upon a time!',
      attrs   : {
        figure: {
          class: 'easywyg-figure easywyg-figure-left'
        },
        img: {
          border: 0
        },
        figcaption: {
          'data-id': 'xxx'
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

    operation.execute(entities);
    expect(document.body.innerHTML).to.be.equal(
      '<figure class="easywyg-figure easywyg-figure-left"><a href="#"><img border="0"></a><figcaption data-id="xxx"><em>Once</em> <strong>upon</strong> a time!</figcaption></figure>'
    );
  });
});
