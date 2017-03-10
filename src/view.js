import VdomBuilder from './segments/vdom_builder';

// View abstract class
// Note: this class cannot be instantiated directly
export default class {
  // Обрамить разметкой `markup` текст `text`.
  // Возвращает массив виртуальных нод.
  buildMarkup(text, markup) {
    let tagger = new VdomBuilder(text, markup, this.vnode, this.vtext);
    return tagger.process()
  }

  // TODO: Метод patch работает не так, как мне нужно.
  // В сложных случаях, когда пересекается разметка, он работает неправильно.
  // Видимо, нужно будет написать свою реализацию виртуального дома. А пока обойдемся без него.
  render(entity) {
    return this.build(entity)
  }
}
