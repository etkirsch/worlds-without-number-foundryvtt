import {actorTemplatePath} from '../consts.js';
import {TestableActorSheet} from '../utils/testable-actor-sheet.js';
import SkillBuilder from './skill-builder.js';
import {WorldsConfiguration} from '../worlds-configuration.js';
import DialogBuilder from '../utils/builders/dialog-builder.js';
import {BasicNoButton, BasicYesButton} from './templates/button-templates.js';
import {SkillRollTemplate} from './templates/dialog-templates.js';

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

    // TODO: Replace this with the singleton
    const skills = this.getSkills(config);

    // TODO: Remove after we know dialogues work
    const builder = new DialogBuilder();
    builder
        .withTitle('Sample Title')
        .withContent(SkillRollTemplate)
        .withButton({
          ...BasicNoButton,
          key: 'noButton',
          callback: () => console.log('clicked No'),
        })
        .withButton({
          ...BasicYesButton,
          key: 'yesButton',
          callback: () => console.log('clicked Yes'),
        })
        .withCloseCallBack(() => {
          console.log('Dialog closed.');
        })
        .build()
        .render(true);

    return {
      foundryData: sheetData,
      actor: {
        ...sheetData.actor,
        skills,
      },
    };
  }
}
