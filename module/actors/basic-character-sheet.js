import {actorTemplatePath} from '../consts.js';
import {TestableActorSheet} from '../utils/testable-actor-sheet.js';
import SkillBuilder from './skill-builder.js';
import {WorldsConfiguration} from '../worlds-configuration.js';

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

  /**
   * getSkills. Aggregate all skills pertinent to this character sheet.
   * @param {Object} config Either the WorldsConfiguration or a mocked config
   * @return {Object} An array of Skill Objects in alphabetical order
   */
  getSkills(config) {
    const skillBuilder = new SkillBuilder(config);
    const skills = skillBuilder.buildAll();
    return skills;
  }

  /**
   * getData. Retrieves data for use in Actor Sheet Templates.
   * @override
   * @param {Object} config Optional mocked config for testing purposes
   * @return {Object} The BasicCharacterSheet's data for use in templates
   */
  getData({config=WorldsConfiguration}) {
    const sheetData = super.getData();
    debugger;

    // TOOD: Replace this with the singleton
    const skills = this.getSkills(config);

    return {
      foundryData: sheetData,
      actor: {
        ...sheetData.actor,
        skills,
      },
    };
  }
}
