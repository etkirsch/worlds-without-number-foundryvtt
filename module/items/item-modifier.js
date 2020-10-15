import { modulePath } from '../consts.js'

export default class ItemModifier extends ItemSheet {
  static get defaultOptions () {
    return {
      ...super.defaultOptions,
      classes: ["sheet", "item"],
      template: `${modulePath}/items/item-modifier.html`
    }
  }
}
