import { itemTemplatePath } from '../consts.js'
import { TestableItemSheet } from '../utils/testable-item-sheet.js'

export default class BasicItem extends TestableItemSheet {
  static get defaultOptions () {
    return {
      ...super.defaultOptions,
      classes: ["sheet", "item"],
      template: `${itemTemplatePath}/basic-item.html`
    }
  }

  async _onSubmit (event, options) {
    console.dir(event)
    console.dir(options)
  }
}
