# Mekong
A Rich text editor Model layer. (not finished yet)

### Quick example

```js
  // Insert new <p> into document.body
  let api = new Api;
  let container = document.body;
  let entity = api.operate('Insert', 'Paragraph', { text: 'Hello world!' }, container);

  // Update paragraph text
  api.operate('Update', entity, { text: 'Yellow', start: 0, end: 5, attrs: { class: 'headline' } });

  // It gives: <p class="headline">Yellow world!</p>

```

### Entities
##### Embed
It represents a built-in HTML code from a website. For example, videos from YouTube, or Twitter's tweet.

##### Grid and GridColumn
Responsive grid, as like a Twitter Bootstrap grid. Cannot contain nested grids.
Grid columns can only have such entities inside: `Paragraph`, `List`, `Table`, `Image`, `Substrate`, `Embed`.

##### Image
Just an image, always wrapped with `figure` tag. May contain a hyperlink and `figcaption`.
Figcaption can only have inline markup.

##### List
Unordered or ordered list with nesting. Its items cannot contain anything other than text with some inline markup.

##### Paragraph
A semantic paragraph. It can be one of `P`, `BLOCKQUOTE`, `PRE`, `H1`, `H2`, `H3`, `H4`, `H5`, `H6`.

##### RootContainer
This is where all the generated html code is inserted.

##### Substrate
A container which combines several `Paragraph`, `List`, `Table`, `Image`, `Embed` entities.

##### Table
A regular HTML table. Cannot have anything than text and inline markup within it cells.

### Operations

##### Types of operations

* Delete - remove entity.
* Insert - insert entity.
* Move - move antity after another.
* Replace - replace one entity with another.
* Transfer - put entity into container entity (`Substrate`, `GridColumn` or `RootContainer`).
* Transform - transform one entity into another, if it is transformable.
* Update - update entity text, markup or another data.

##### Serialize operation
...
