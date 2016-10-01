import Converter from '../../src/converter';

describe('Converter', () => {
  it.only('converts P tag', () => {
    let converter = new Converter;
    //let frag = document.createDocumentFragment();
    //frag.appendChild(document.createTextNode("some text</span>"));

    let temp = document.createElement('template');
    temp.innerHTML = '<p><em>some</em> <strong class="yay"><em>text</em></strong></p>\
    <img src="http://e1.ru/logo.png"><pre>xxx</pre>';

    let frag = temp.content;
    let result = converter.process(frag)

    // Это будет набор entities, которые потом нужно будет вставить
    // при помощи операции Insert
    expect(result).to.deep.equal([
      {
        "attrs": {},
        "markup": [
          ['em', 0, 4, {}],
          ['em', 5, 9, {}],
          ['strong', 5, 9, { class: 'yay' }]
        ],
        "tag": "p",
        "text": "some text"
      },
      {
        "attrs": {
          "a": {},
          "figcaption": {},
          "figure": {},
          "img": {
            "src": "http://e1.ru/logo.png"
          }
        },
        "caption": "",
        "markup": []
      },
      {
        "attrs": {},
        "markup": [],
        "tag": "pre",
        "text": "xxx"
      }
    ]);
  });
});


/*
describe 'Converter', ->
  it 'should be done 0', ->
    html = ''
    expect(process(html)).to.be.equal html

  it 'should be done 01', ->
    html = 'http://tema.livejournal.com/'
    expect(process(html)).to.be.equal "<p>http://tema.livejournal.com/</p>"

  it 'should be done 1', ->
    html = 'text <em>lol</em><blockquote><p>yay <strong>foo</strong></p><b>baz</b></blockquote><span>damn</span>'
    expect(process(html)).to.be.equal '<p>text <em>lol</em></p><blockquote><strong>baz</strong></blockquote><p>yay <strong>foo</strong></p><p>damn</p>'

  it 'should be done 2', ->
    html = '<strong>one</strong>'
    expect(process(html)).to.be.equal '<p><strong>one</strong></p>'

  it 'should be done 3', ->
    html = '<p>one <strong>two</strong></p><p>three</p>'
    expect(process(html)).to.be.equal html

  it 'should be done 4', ->
    html = '<p>one</p>'
    expect(process(html)).to.be.equal html

  it 'should be done 5', ->
    html = '<p>xxx</p><section><h1>yyy</h1>zzz</section>www'
    expect(process(html)).to.be.equal '<p>xxx</p><section><h1>yyy</h1><p>zzz</p></section><p>www</p>'

  it 'should be done 6', ->
    html = '<div><div><p>one</p></div><div><p>two</p></div></div>'
    expect(process(html)).to.be.equal '<p>one</p><p>two</p>'

  it 'should be done 7', ->
    html = '<div><div>one</div><div>two</div></div>'
    expect(process(html)).to.be.equal '<p>one</p><p>two</p>'

  it 'should be done 8', ->
    html = '<table><tr><td></td><td><blockquote>one</blockquote></td></tr></table>'
    expect(process(html)).to.be.equal '<table><tbody><tr><td></td><td>one</td></tr></tbody></table>'

  it 'should be done 9', ->
    html = '<table><tr><td></td><td>one</td></tr></table>'
    expect(process(html)).to.be.equal '<table><tbody><tr><td></td><td>one</td></tr></tbody></table>'

  it 'should be done 10', ->
    html = '<p>one</p><table><tr><td></td><td>one</td></tr></table><p>two</p>'
    expect(process(html)).to.be.equal '<p>one</p><table><tbody><tr><td></td><td>one</td></tr></tbody></table><p>two</p>'

  it 'should be done 11', -> # Удаляем вложенную таблицу
    html = '<p>one</p><table><tr><td></td><td><table><tr><td>one</td></tr></table></td></tr></table><p>two</p>'
    expect(process(html)).to.be.equal '<p>one</p><p>two</p>'

  it 'should be done 12', ->
    html = '<table><tr><td></td><td><table><tr><td>one</td></tr></table>two</td></tr></table>'
    expect(process(html)).to.be.equal '<table><tbody><tr><td></td><td>two</td></tr></tbody></table>'

  it 'should be done 13', ->
    html = '<p><img src="http://www.alucine.es/wp-content/uploads/2014/04/188.jpg" width="400" align="left">one</p>'
    expect(process(html)).to.be.equal '<p>one</p><figure class="easywyg-pull-left"><img src="http://www.alucine.es/wp-content/uploads/2014/04/188.jpg" width="400"></figure>'

  it 'should be done 14', ->
    html = '<img src="http://www.alucine.es/wp-content/uploads/2014/04/188.jpg" width="400" align="left"><p>one</p>'
    expect(process(html)).to.be.equal '<figure class="easywyg-pull-left"><img src="http://www.alucine.es/wp-content/uploads/2014/04/188.jpg" width="400"></figure><p>one</p>'

  it 'should be done 15', ->
    html = '<figure class="easywyg-pull-left"><img src="http://www.alucine.es/wp-content/uploads/2014/04/188.jpg" width="400"></figure><p>one</p>'
    expect(process(html)).to.be.equal html

  it 'should be done 16', ->
    html = '<br><p>one<br>two<br></p>'
    expect(process(html)).to.be.equal '<p>one<br>two</p>'

  it 'should be done 17', ->
    html = '<p>before</p><div class="easywyg-grid"><div class="easywyg-col-6"><p>one</p></div><div class="easywyg-col-6"><p>two</p></div></div><p>after</p>'
    expect(process(html)).to.be.equal html

  it 'should be done 18', ->
    html = '<p>before</p><div class="easywyg-grid"><div class="easywyg-col-6">one</div><div class="easywyg-col-6">two</div></div><p>after</p>'
    expect(process(html)).to.be.equal '<p>before</p><div class="easywyg-grid"><div class="easywyg-col-6"><p>one</p></div><div class="easywyg-col-6"><p>two</p></div></div><p>after</p>'

  it 'should be done 19', ->
    html = '<p>before</p><div class="easywyg-grid"><div class="easywyg-col-6">one<br>zero</div><div class="easywyg-col-6"><p>two<br>five</p></div></div><p>after</p>'
    expect(process(html)).to.be.equal '<p>before</p><div class="easywyg-grid"><div class="easywyg-col-6"><p>one</p><p>zero</p></div><div class="easywyg-col-6"><p>two<br>five</p></div></div><p>after</p>'

  it 'should be done 20', ->
    html = '<p>before</p><div class="easywyg-embed" easywyg-data-code="PGlmcmFtZSBzcmM9IiI+PC9pZnJhbWU+"><iframe src=""></iframe></div><p>after</p>'
    expect(process(html)).to.be.equal html

  it 'should be done 21', ->
    html = '<div class="easywyg-grid"><div class="easywyg-col-6"><div class="easywyg-embed" easywyg-data-code="PGlmcmFtZSBzcmM9IiI+PC9pZnJhbWU+"><iframe src=""></iframe></div></div><div class="easywyg-col-6"></div></div>'
    expect(process(html)).to.be.equal html

  it 'should be done 22', ->
    html = '<p>one <em><strong>two</strong></em> three</p>'
    expect(process(html)).to.be.equal html

  it 'should be done 23', ->
    html = '<table><thead><tr><th>1</th><th>2</th></tr></thead><tbody><tr><td>3</td><td>4</td></tr><tr><td>5</td><td>6</td></tr></tbody></table>'
    expect(process(html)).to.be.equal html

  it 'should be done 24', ->
    html = '<blockquote><ul><li>1</li><li>2<ul><li>2.1</li><li>2.2</li></ul></li><li>3</li></ul></blockquote>'
    expect(process(html)).to.be.equal '<ul><li>1</li><li>2<ul><li>2.1</li><li>2.2</li></ul></li><li>3</li></ul>'

  it 'should be done 25', ->
    html = '<ul><li>1</li><li>2<ul><li>2.1</li><li>2.2</li></ul></li><li>3</li></ul>'
    expect(process(html)).to.be.equal html

  it 'should be done 26', ->
    html = '<table><thead><tr><th>one</th><th>two <em>three</em></th></tr></thead></table>'
    expect(process(html)).to.be.equal html

  it 'should be done 27', ->
    html = '<p class="notallowed">one</p>'
    expect(process(html)).to.be.equal '<p>one</p>'

  it 'should be done 27.1', ->
    html = '<p class="allowed">one</p>'
    expect(process(html)).to.be.equal html

  it 'should be done 28', ->
    html = '<h1><span>one</span></h1>'
    expect(process(html)).to.be.equal '<h1>one</h1>'

  it 'should be done 29', ->
    html = '<div><ul><li>one</li></ul><h2>two</h2></div>'
    expect(process(html)).to.be.equal '<ul><li>one</li></ul><h2>two</h2>'

  it 'should be done 30', ->
    html = '<div><table><tbody><tr><td>one</td></tr></tbody></table><h2>two</h2></div>'
    expect(process(html)).to.be.equal '<table><tbody><tr><td>one</td></tr></tbody></table><h2>two</h2>'

  it 'should be done 31', ->
    html = '<hr>'
    expect(process(html)).to.be.equal html

  it 'should be done 32', ->
    html = '<ul><li><span>one</span></li></ul>'
    expect(process(html)).to.be.equal '<ul><li>one</li></ul>'

  it 'should be done 33', ->
    html = "<figure class=\"easywyg-pull-center\"><img src=\"http://www.alucine.es/wp-content/uploads/2014/04/188.jpg\" width=\"400\"></figure>"
    expect(process(html)).to.be.equal html.replace(/\n/g, '')

  it 'should be done 34', ->
    html = '<p><a href="http://e1.ru"><img src="http://www.alucine.es/wp-content/uploads/2014/04/188.jpg" width="400"></a></p>'
    expect(process(html)).to.be.equal '<figure class="easywyg-pull-center"><a href="http://e1.ru"><img src="http://www.alucine.es/wp-content/uploads/2014/04/188.jpg" width="400"></a></figure>'

  it 'should be done 35', ->
    html = '<figure class="easywyg-pull-center"><a href="http://e1.ru"><img src="http://www.alucine.es/wp-content/uploads/2014/04/188.jpg" width="400"></a></figure>'
    expect(process(html)).to.be.equal html

  it 'should be done 36', ->
    html = '<a href="http://e1.ru"><img src="http://www.alucine.es/wp-content/uploads/2014/04/188.jpg" width="400"></a>'
    expect(process(html)).to.be.equal '<figure class="easywyg-pull-center"><a href="http://e1.ru"><img src="http://www.alucine.es/wp-content/uploads/2014/04/188.jpg" width="400"></a></figure>'

  it 'should be done 37', ->
    html = '<table><tbody><tr><td>one</td><td><a href="http://e1.ru"><img src="http://www.alucine.es/wp-content/uploads/2014/04/188.jpg" width="400"></a></td></tr></tbody></table>'
    expect(process(html)).to.be.equal '<table><tbody><tr><td>one</td><td></td></tr></tbody></table><figure class="easywyg-pull-center"><a href="http://e1.ru"><img src="http://www.alucine.es/wp-content/uploads/2014/04/188.jpg" width="400"></a></figure>'

  it 'should be done 38', ->
    html = '<figure class="easywyg-pull-right" contenteditable="false" draggable="true"><a href="http://e1.ru"><div class="easywyg-ui-image-wrapper"><div class="easywyg-ui-image-link-placeholder"><div class="easywyg-ui-image-link-href"><span class="easywyg-ui-image-link-icon"></span><span class="easywyg-ui-image-link-text" data-tooltip="Click to add link">http://e1.ru</span></div></div><div class="easywyg-ui-image-link-button" title="Image link"></div><div class="easywyg-ui-remove-button" title="Remove image"></div><div class="easywyg-ui-knob"></div><img src="http://www.alucine.es/wp-content/uploads/2014/04/188.jpg" width="400" contenteditable="false" data-original-width="1920" draggable="false"></div></a></figure>'
    clean = '<figure class="easywyg-pull-right"><a href="http://e1.ru"><img src="http://www.alucine.es/wp-content/uploads/2014/04/188.jpg" width="400"></a></figure>'
    expect(process(html)).to.be.equal clean

  it 'should be done 39', ->
    html = '<p><iframe width="640" height="480" src="//www.youtube.com/embed/9m8stblWx8c" frameborder="0" allowfullscreen></iframe></p>'
    clean = '<div class="easywyg-embed" easywyg-data-code="PGlmcmFtZSB3aWR0aD0iNjQwIiBoZWlnaHQ9IjQ4MCIgc3JjPSIvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC85bThzdGJsV3g4YyIgZnJhbWVib3JkZXI9IjAiIGFsbG93ZnVsbHNjcmVlbj0iIj48L2lmcmFtZT4="><iframe width="640" height="480" src="//www.youtube.com/embed/9m8stblWx8c" frameborder="0" allowfullscreen=""></iframe></div>'
    expect(process(html)).to.be.equal clean

  it 'should be done 40', ->
    html = '<iframe width="640" height="480" src="//www.youtube.com/embed/9m8stblWx8c" frameborder="0" allowfullscreen></iframe>'
    clean = '<div class="easywyg-embed" easywyg-data-code="PGlmcmFtZSB3aWR0aD0iNjQwIiBoZWlnaHQ9IjQ4MCIgc3JjPSIvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC85bThzdGJsV3g4YyIgZnJhbWVib3JkZXI9IjAiIGFsbG93ZnVsbHNjcmVlbj0iIj48L2lmcmFtZT4="><iframe width="640" height="480" src="//www.youtube.com/embed/9m8stblWx8c" frameborder="0" allowfullscreen=""></iframe></div>'
    expect(process(html)).to.be.equal clean

  it 'should be done 41', ->
    html = '<a href="http://e1.ru">some link</a> some text'
    expect(process(html)).to.be.equal '<p><a href="http://e1.ru">some link</a> some text</p>'

  it 'should be done 42', ->
    html = '<div><ul><li>one</li></ul></div><div><ul><li>two</li></ul></div>'
    expect(process(html)).to.be.equal '<ul><li>one</li></ul><ul><li>two</li></ul>'

  it 'should be done 43', ->
    html = '<div><ul><li>one</li><li>two</li></ul></div><div><ul><li>three</li></ul></div>'
    expect(process(html)).to.be.equal '<ul><li>one</li><li>two</li></ul><ul><li>three</li></ul>'

  it 'should be done 44', ->
    html = '<div><ul><li>one</li><li>two</li></ul></div><div><em>ein</em></div><div><ul><li>three</li></ul></div>'
    expect(process(html)).to.be.equal '<ul><li>one</li><li>two</li></ul><p><em>ein</em></p><ul><li>three</li></ul>'

  it 'should be done 45', ->
    html = '<ul><li>one <em>two</em></li><li>three</li><li>four <strong>five</strong></li></ul>'
    expect(process(html)).to.be.equal html

  it 'should be done 46', ->
    html = "<pre>1\n2</pre>"
    expect(process(html)).to.be.equal html

  it 'should be done 47', ->
    html = '<div class="easywyg-grid"><div class="easywyg-col-6"><table><tbody><tr><th>one</th><th>two</th></tr></tbody></table></div><div class="easywyg-col-6"><figure class="easywyg-pull-left"><img src="http://www.alucine.es/wp-content/uploads/2014/04/188.jpg" width="400"></figure></div></div>'
    expect(process(html)).to.be.equal html

  it 'should be done 48', ->
    html = '<p>one&nbsp;two three</p>'
    expect(process(html)).to.be.equal '<p>one two three</p>'

  it 'should be done 49', ->
    html = '<table><tr><td><a href="#"><img src="http://www.e1.ru/news/images/new1/433/120/images/0_13914a_9a411162_orig_300x200.jpg"></a></td></tr><tr><td>bbb</td></tr></table>'
    expect(process(html)).to.be.equal '<table><tbody><tr><td></td></tr><tr><td>bbb</td></tr></tbody></table><figure class="easywyg-pull-center"><a href="#"><img src="http://www.e1.ru/news/images/new1/433/120/images/0_13914a_9a411162_orig_300x200.jpg"></a></figure>'

  it 'should be done 50', ->
    html = '<span>xxx<span>&nbsp;</span></span><a href="http://e1.ru">yyy</a><span><span>&nbsp;</span>zzz</span>'
    expect(process(html)).to.be.equal '<p>xxx <a href="http://e1.ru">yyy</a> zzz</p>'

*/
