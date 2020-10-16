import {actorTemplatePath} from '../consts.js';
import {TestableActorSheet} from '../utils/testable-actor-sheet.js';

/** BasicCharacterSheet. The Basic Character class is the entry point
 * for Player Characters, NPCs, and creatures.
 */
export default class BasicCharacterSheet extends TestableActorSheet {
  /**
   * defaultOptions. A static getter meant to override the parent
   * defaultOptions within ActorSheet.
   * @return {object} a collection of default options inc. template
   */
  static get defaultOptions() {
    return {
      ...super.defaultOptions,
      classes: ['character'],
      template: `${actorTemplatePath}/basic-character-sheet.html`,
    };
  }
}
