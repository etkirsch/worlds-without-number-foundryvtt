import { actorTemplatePath } from '../consts.js'
import { TestableActorSheet } from '../utils/testable-actor-sheet.js'

/* The Basic Character class is the entry point for Player Characters,
 * NPCs, and creatures. */
export default class BasicCharacter extends TestableActorSheet {
  static get defaultOptions () {
    return {
      ...super.defaultOptions,
      classes: ["sheet", "actor"],
      template: `${actorTemplatePath}/basic-character.html`
    }
  }

  getData () {
    debugger
    return {
      vitals: {
        health: 15
      }
    }
  }

  async _onSubmit (event, options) {
  }
}
