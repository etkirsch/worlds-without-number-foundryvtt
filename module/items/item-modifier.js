import { itemTemplatePath } from '../consts.js'
import { TestableItemSheet } from '../utils/testable-item-sheet.js'

export default class ItemModifier extends TestableItemSheet {
  static get defaultOptions () {
    return {
      ...super.defaultOptions,
      classes: ["sheet", "item"],
      template: `${itemTemplatePath}/item-modifier.html`
    }
  }
}
