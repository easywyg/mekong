// Commands
import InsertItemCommand from './commands/item/insert.js';
import Policy from './policies/item.js';

export default function(core) {
  return class Item extends core.Lib.Mix(core.Entity).with(
    core.Mixin.TextMethods, core.Mixin.MarkupMethods, core.Mixin.AttrMethods) {

    static type = 'list_item'
    static defaultState = {
      items: [],
      tag: 'li',
      text: '',
      start: null,
      end: null,
      markup: [],
      attrs: {}
    }

    // TODO: тут надо сделать наподобие как в Entity
    constructor(state, list) {
      super(state)

      this.list = list
      this.reference = null
      this.onCommand = this.list.onCommand

      // TODO: Возможно надо вернуть понятие Particle и в нем переопределять эти колбэки,
      // а ссылку на саму сущность всегда именовать как entity
      this.changeState = () => { this.list.changeState() }
    }

    createItem() {
      const command = new InsertItemCommand(this)
      this.list.runCommand(command)

      return command.newItem
    }
  }
}
