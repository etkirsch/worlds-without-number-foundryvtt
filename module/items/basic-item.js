import { itemTemplatePath } from '../consts.js'

export default class BasicItem extends ItemSheet {
  static get defaultOptions () {
    return {
      ...super.defaultOptions,
      classes: ["sheet", "item"],
      template: `${itemTemplatePath}/basic-item.html`
    }
  }
}
