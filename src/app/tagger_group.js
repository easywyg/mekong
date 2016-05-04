import {VNode, VText, create} from 'virtual-dom';

// Теги, подлежащие трансформации
const TRANSFORM = {
  'b' : 'strong',
  'i' : 'em',
  's' : 'del'
};

// Разрешенные инлайновые теги
const TAGS = [
  'a', 'abbr', 'acronym', 'cite', 'code', 'dfn', 'kbd', 'strong', 'samp', 'time', 'em',
  'del', 'u', 'ins', 'bdo', 'br', 'q', 'sub', 'sup', 'var', 'small', 'big', 'tt',
  's'
];

export default class {
  constructor(data) {
    this.data = data;
  }

  srt(a, b) {
    if (a[1] < b[1] || a[2] < b[2]) return 1;
    if (a[1] > b[1] || a[2] > b[2]) return -1;
    return 0;
  }

  vnode(...args) {
    return new VNode(...args);
  }

  vtext(...args) {
    return new VText(...args);
  }

  generateVTree() {
    let textNodes = [],
        nodes = [];

    this.data.forEach((x) => {
      if (x[3].type == 3) { // TextNode
        textNodes.push(x);
      } else { // Node
        nodes.push(x);
      }
    });

    textNodes.sort(this.srt);
    nodes.sort(this.srt);

    let current = null;
    while (textNodes.length + nodes.length > 0) {
      let textNode = textNodes.shift();
      let parentNode = nodes.shift();
      let node;
      let children = [];

      if (parentNode) {
        node = this.vnode(parentNode[0], parentNode[3].attrs, children);

        if (textNode) {
          children.push(this.vtext(textNode[0]));
        }

        if (current) { children.push(current) }
        current = node;
      } else {
        current = [this.vtext(textNode[0]), current];
      }
    }

    if (!Array.isArray(current)) {
      current = [current];
    }

    return current;
  }
}
