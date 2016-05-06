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
    this.data.sort(this.sortNodes);
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

  generate() {
    let cur = null;
    let result = null;
    let parents = {};

    this.data.forEach((entry, i) => {
      let type = entry[3].type;

      if (type == 1) {
        let newCur = this.vnode(entry[0], entry[3].attrs, []);

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
          var prev = this.data[i - 1];
          if (entry[1] == prev[1] && entry[2] == prev[2]) {
            cur = parents[JSON.stringify(prev)]
          }
        } else {
          result = this.vtext(entry[0]);
        }
      }
    });

    return result;
  }
}
