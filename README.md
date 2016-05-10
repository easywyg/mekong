# Mekong
A Rich text editor Model layer. (not finished yet)

### Quick example

```js
  // Insert new <p> into document.body
  let api = new Api;
  let container = api.operate('Insert', 'RootContainer', {}, document.body).result;
  let entity = api.operate('Insert', 'Paragraph', { text: 'Hello world!' }, container).result;

  // Update paragraph text
  api.operate('Update', entity, {
    text: 'Yellow',
    start: 0,
    end: 5,
    attrs: { class: 'headline' },
    markup: [
      ['em', 0, 6],
      ['strong', 0, 6, { class: 'yay' }]
    ]
  });

  // It gives: <p class="headline"><strong class="yay"><em>Yellow</em></strong> world!</p>

```

### Entities
##### Embed
It represents a built-in HTML code from a website. For example, videos from YouTube, or Twitter's tweet.

##### Grid and GridColumn
Responsive grid, as like Twitter Bootstrap grid. It can't contain nested grids.
Grid columns can only have such entities inside: `Paragraph`, `List`, `Table`, `Image`, `Substrate`, `Embed`.

##### Image
Just an image, always wrapped with `figure` tag. May contain a hyperlink and `figcaption`.
Figcaption can only have inline markup.

##### List
Unordered or ordered list with nesting. Its items can't contain anything other than text with some inline markup.

##### Paragraph
A semantic paragraph. It can be one of `P`, `BLOCKQUOTE`, `PRE`, `H1`, `H2`, `H3`, `H4`, `H5`, `H6`.

##### RootContainer
This is where all the generated html code is inserted.

##### Substrate
A container which combines several `Paragraph`, `List`, `Table`, `Image`, `Embed` entities.

##### Table
A regular HTML table. It can't have anything other than text and inline markup within it cells.

### Operations
All actions on the text and HTML markup are made only via operations. You don't have to work with DOM directly, you just execute operations and things are done.

##### Types of operations

* Delete - remove entity.
* Insert - insert entity.
* Move - move antity after another.
* Replace - replace one entity with another.
* Transfer - put entity into container entity (`Substrate`, `GridColumn` or `RootContainer`).
* Transform - transform one entity into another, if it is transformable.
* Update - update entity text, markup or another data.

##### Virtual DOM

Mekong utilizes virtual DOM to partially update HTML markup.
