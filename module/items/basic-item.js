import { modulePath } from '../consts.js'

export default class BasicItem extends ItemSheet {
  static get defaultOptions () {
    return {
      ...super.defaultOptions,
      classes: ["sheet", "item"],
      template: `${modulePath}/items/basic-item.html`
    }
  }
}
