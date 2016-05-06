import {VNode, VText, create} from 'virtual-dom';

// Порядок следования тегов в том случае, если у двух тегов
// одинаковые позиции начала и конца. Чем меньше индекс в массиве, тем тег первее.
const TAGS = [
  'a', 'abbr', 'acronym', 'cite', 'code', 'dfn', 'kbd', 'strong', 'b', 'samp', 'time', 'em', 'i',
  'del', 's', 'u', 'ins', 'bdo', 'br', 'q', 'sub', 'sup', 'var', 'small', 'big', 'tt',
  's', 'span'
];

// TaggerVTree
export default class {
  constructor(data) {
    this.data = data;
  }

  sortTextNodes(a, b) {
    if (a[1] < b[1] || a[2] < b[2]) return 1;
    if (a[1] > b[1] || a[2] > b[2]) return -1;
    return 0;
  }

  sortNodes(a, b) {
    if (a[3].type == 3 || b[3].type == 3) return 0;

    if (a[1] == b[1] && a[2] == b[2]) {
      let indexA = TAGS.indexOf(a[0]);
      let indexB = TAGS.indexOf(b[0]);

      if (indexA > indexB) return 1;
      if (indexA < indexB) return -1;
    } else {
      if (a[1] < b[1] || a[2] < b[2]) return 1;
      if (a[1] > b[1] || a[2] > b[2]) return -1;
    }

    return 0;
  }

  vnode(...args) {
    return new VNode(...args);
  }

  vtext(...args) {
    return new VText(...args);
  }

  generateVTree() {
    let cur = null;
    let result = null;
    //let stack = [];
    let parents = {};

    this.data.sort(this.sortNodes);
    //console.log(this.data);
    //console.log('------');

    this.data.forEach((entry, i) => {
      let type = entry[3].type;

      if (type == 1) {
        let newCur = this.vnode(entry[0], entry[3].attrs, []);
        //stack.push(newCur);

        if (cur) {
          parents[JSON.stringify(entry)] = cur;
          cur.children.push(newCur);
        }

        cur = newCur;
        if (!result) result = cur;
      }
      else if (type == 3) {
        if (cur) {
          cur.children.push(this.vtext(entry[0]));

          // При выходе из тега, нужно находить родительский vnode
          //console.log(this.data[i + 1], entry);
          var prev = this.data[i - 1];
          //console.log(entry, prev);
          if (entry[1] == prev[1] && entry[2] == prev[2]) {
            //console.log(stack)
            //console.log('-----')
            //stack.pop(); // Remove parent
            //cur = stack.pop()
            cur = parents[JSON.stringify(prev)]
          }
        } else {
          result = this.vtext(entry[0]);
        }
      }
    });

    //console.log(result);

    return [result];
  }











  zzzzzgenerateVTree() {
    let textNodes = [],
        nodes = [];

    console.log(this.data);
    console.log('-------');

    this.data.forEach((x) => {
      if (x[3].type == 3) { // TextNode
        textNodes.push(x);
      } else { // Node
        nodes.push(x);
      }
    });

    //textNodes.sort(this.sortTextNodes);
    //nodes.sort(this.sortTextNodes);

    //console.log(textNodes);
    //console.log(nodes);

    // Current vnode
    let that = this;

    function generate(curVNnode = null) {
      // Result virtual node list
      let result = [];

      while (textNodes.length > 0) {
        const text = textNodes.shift();
        const node = nodes.shift();

        console.log(node, text, curVNnode)
        console.log(result)

        if (node) {
          let children = [
            that.vtext(text[0])
          ];

          curVNnode = that.vnode(node[0], node[3].attrs)

          children = children.concat(generate(curVNnode));

          curVNnode.children = children;
          result.push(curVNnode);
        }
      }

      return result;
    }

    return generate();
  }











  xxgenerateVTree() {
    let textNodes = [],
        nodes = [];

    this.data.forEach((x) => {
      if (x[3].type == 3) { // TextNode
        textNodes.push(x);
      } else { // Node
        nodes.push(x);
      }
    });

    //textNodes.sort(this.sortTextNodes);
    //nodes.sort(this.sortNodes);

    //console.log(textNodes, nodes)


    // Current vnode
    let vnodes = [];
    let that = this;

    function generate(curVNnode = null) {
      // Result virtual node list
      let result = [];

      while (textNodes.length > 0) {
        const text = textNodes.shift();
        const node = nodes.shift();

        let children = [];

        if (typeof node != 'undefined') {
          children.push(that.vtext(text[0]));
          curVNnode = that.vnode(node[0], node[3].attrs);
          children = children.concat(generate(curVNnode));

          // Создаем новую виртуальную ноду
          curVNnode.children = children;
          result.push(curVNnode);
          //curVNnode = that.vnode(node[0], node[3].attrs, children);
        } else {
          console.log(text[0], curVNnode)
          curVNnode.children.push(that.vtext(text[0]))
        }

        //console.log(text[0])
        //console.log(curVNnode)
      }

      return result;
    }

    vnodes = generate();
    //console.log(vnodes);
/*
    // Рекурсия??
    while (textNodes.length + nodes.length > 0) {
      const textNode = textNodes.pop();
      const node = nodes.pop();
      const children = [];

      if (node) {
        // Создаем новую виртуальную ноду
        let newVNode = this.vnode(node[0], node[3].attrs, children);

        // Если есть текущая нода, добавляем вновь совданную ноду в список детей
        if (curVNnode) {
          curVNnode.children.push(newVNode);
        }

        curVNnode = newVNode;
        vnodes.push(curVNnode);
      }
    }

    console.log(vnodes);
*/
    return vnodes;
  }












  // Генерируем дерево виртуальных нод.
  // Возвращает массив.
  xgenerateVTree() {
    let textNodes = [],
        nodes = [];

    this.data.forEach((x) => {
      if (x[3].type == 3) { // TextNode
        textNodes.push(x);
      } else { // Node
        nodes.push(x);
      }
    });

    textNodes.sort(this.sortTextNodes);
    nodes.sort(this.sortNodes);

    //console.log(textNodes);
    //console.log(nodes);
    //console.log('-----------------');
/*
[ [ 'ly', 3, 5, { type: 3, attrs: {} } ],
  [ 'l', 2, 3, { type: 3, attrs: {} } ],
  [ 'je', 0, 2, { type: 3, attrs: {} } ] ]
[ [ 'em', 2, 3, { type: 1, attrs: {} } ],
  [ 'span', 0, 5, { type: 1, attrs: {} } ],

 */
    let current = null;

    while (textNodes.length + nodes.length > 0) {
      let textNode = textNodes.shift();
      let parentNode = nodes.shift();
      let node;
      let children = [];

      if (parentNode) {
        node = this.vnode(parentNode[0], parentNode[3].attrs, children);

        if (textNode) {
          var newTextNode = this.vtext(textNode[0]);

          //console.log(current, newTextNode);
          children.push(newTextNode);
        }

        if (current) { children.push(current) }
        current = node;
        //console.log('--------------')
        //console.log(current)
        //console.log('--------------')
      } else {
        //current.children.unshift(this.vtext(textNode[0]))
        console.log(current);
        //current.children.push(this.vtext(textNode[0]));
        /*let newCurrent = [this.vtext(textNode[0])];
        if (current) {
          if (current.length == 1 && current[0] instanceof VText ) {
            newCurrent.push(current[0]);
          } else {
            newCurrent.push(current);
          }
        }

        current = newCurrent;*/
      }
    }

    if (!Array.isArray(current)) {
      current = [current];
    }

    //console.dir(current[0].children);

    return current;
  }
}
