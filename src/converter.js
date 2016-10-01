import Analyzer from './converter/analyzer';

/*

<p>some text</p><img src="http://e1.ru/logo.png">

- Похоже что HTML нужно предварительно обрабатывать, т.е. оборачивать в
  параграфы, не допускать, чтобы внутри P был IMG (выносить его) и т.д.,
  и только на последней стадии превращать всё это в JSON, иначе всё будет очень
  медленно.
- Встретили P, значит нам нужно собрать весь текст внутри, пока
  не сматчится новый матчер
- Нужен массив всех контейнеров, начиная с body и кончая контейнерами внутри body.
  Именно этот массив и должен обрабатываться в последствии.

Алгоритм:

1. Разбиваем весь HTML по контейнерам, получаем массив контейнеров.
2. Пробегаемся по элементам массива, в результате чего создаем новый массив
   с аналогичным числом элементов, но уже с нормализованным HTML кодом.
3. Пробегаемся по нормализованным элементам массива и конфертируем весь код в JSON,
   в результате чего получаем новый массив с кол-вом элементов как у старого.
4. Собираем JSON из всех элементов массива воедино, добавляя в JSON описание
   контейнеров и ссылки на их содержимое (которое тоже JSON).


 */

class ParagraphMatcher {
  // Матчим ноду
  match(node) {
    return this.matchTag(node.nodeName);
  }

  // TODO: Походу PRE это не совсем параграф
  matchTag(nodeName) {
    const allowTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'figure', 'pre', 'address'];
    return allowTags.indexOf(nodeName.toLowerCase()) != -1
  }

  // Конвертируем ноду в JSON
  convert(node) {
    return {
      tag    : this.getTag(node),
      text   : this.getContents(node),
      attrs  : this.convertAttrs(node),
      markup : this.convertMarkup(node)
    };
  }

  getTag(node) {
    return node.nodeName.toLowerCase();
  }

  getContents(node) {
    return node.textContent;
  }

  // Конвертируем разметку ноды в JSON
  convertMarkup(node) {
    let markup = [];
    let pos = { start: 0, end: 0};

    const loop = (el) => {
      let len = el.childNodes.length;

      for (let i = 0; i < len; i++) {
        let cur = el.childNodes[i];

        if (cur.nodeType == 3) {
          pos.start = pos.end;
          pos.end = pos.end + cur.length;
        }

        if (cur.childNodes.length > 0) {
          loop(cur);
        }

        if (cur.nodeType == 1 && this.isMarkupNode(cur)) {
          //console.log('| ', cur.nodeName, pos);
          markup.push([
            cur.nodeName.toLowerCase(), pos.start, pos.end, this.convertAttrs(cur)
          ]);
        }
      }
    }

    loop(node);

    return markup;
  }

  isMarkupNode(node) {
    const markupTags = ['strong', 'em'];
    return markupTags.indexOf(node.nodeName.toLowerCase()) != -1
  }

  convertAttrs(node) {
    let attrs = {};

    if (node.classList.length > 0) {
      attrs.class = node.classList.toString();
    }

    return attrs;
  }
}

class ImageMatcher {
  match(node) {
    return node.nodeName == 'IMG';
  }

  // Конвертируем ноду и ее детей в JSON
  convert(node) {
    return {
      caption : '',
      attrs   : {
        figure: {},
        img: {
          src: node.src
        },
        figcaption: {},
        a: {}
      },
      markup: []
    }
  }
}

class Matchers {
  constructor() {
    this.matchers = [
      new ParagraphMatcher,
      new ImageMatcher
    ];
  }

  match(node) {
    return this.matchers.find((matcher) => {
      return matcher.match(node)
    });
  }
}

// Convert set of DOM nodes to set of commands
export default class {
  constructor() {
    this.analyzer = new Analyzer;
    this.matchers = new Matchers;

    this.reset();
  }

  reset() {
    this.entities = [];
  }

  // Берет все ноды внутри контейнера, которым может быть либо документ,
  // лидо фрагмент документа, либо нода и создаёт из них последовательность команд.
  process(nodeList) {
    this.convert(nodeList)
    return this.entities;
  }

  convert(nodeList) {
    let len = nodeList.childNodes.length;

    for (let i = 0; i < len; i++) {
      let node = nodeList.childNodes[i];

      if (node.nodeType != 1 || node.matched) {
        continue;
      }

      let matcher = this.matchers.match(node);

      // Здесь матчим таги
      if (matcher && matcher.match(node)) {
        node.matched = true;
        this.entities.push(matcher.convert(node));
      }

      this.convert(node);
    }
  }
}
