import { actorTemplatePath } from '../consts.js'
import { TestableActorSheet } from '../utils/testable-actor-sheet.js'

/* The Basic Character class is the entry point for Player Characters,
 * NPCs, and creatures. */
export default class BasicCharacter extends TestableActorSheet {
  static get defaultOptions () {
    return {
      ...super.defaultOptions,
      classes: ["character"],
      template: `${actorTemplatePath}/basic-character.html`
    }
  }

  getData () {
    return {
      health: 15
    }
  }

  async _onSubmit (event, options) {
  }
}
