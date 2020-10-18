import {TestableActorSheet} from '../utils/testing/testable-actor-sheet.js';
import {TestableRoll} from '../utils/testing/testable-roll.js';
import {actorTemplatePath} from '../consts.js';
import SkillBuilder from './skill-builder.js';
import {WorldsConfiguration} from '../worlds-configuration.js';

/**
 * BasicCharacterSheet. The Basic Character class is the entry point
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
   * attributeLabelSelectorText. Creates the label selector text for an
   * attribute type. This must match up to this Sheet's HTML template.
   * @param {string} attribute The requested attribute, e.g. 'strength'
   * @return {string} The selector text for the requested attribute
   */
  static attributeLabelSelectorText(attribute) {
    return `.attributes-body label.${attribute}`;
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
   * getTemplateAttributeModifiers. Gets strings for each of the attribute
   * modifiers. Positive values are prepended with '+' and zero values are
   * returned as '--' instead of a value.
   * @param {Object} config The configuration passed to getData or a mock
   * @return {Object} A dictionary with key attribute name and value result
   */
  getTemplateAttributeModifiers(config) {
    return config.attributeConfiguration.map((attribute) => {
      const attributeValue = this.actor.data[attribute.name];
      const modifier = this.actor.constructor.attributeModifier(attributeValue);
      return this.actor.constructor.getTemplateModifier(modifier);
    });
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
    const attributeModifiers = this.getTemplateAttributeModifiers(config);

    return {
      foundryData: sheetData,
      actor: {
        ...sheetData.actor,
        skills,
        computed: {
          ...attributeModifiers,
        },
      },
    };
  }

  /**
   * clickAttribute. A testing function for determining how click events
   * register in foundry.
   * @param {string} attributeType The type of attribute clicked
   * @param {Array} _testableRoll Testing only. See mocked-roll.js
   */
  clickAttribute(attributeType, _testableRoll) {
    const {data} = this.actor.data;
    const mod = this.actor.constructor.attributeModifier(data[attributeType]);

    // Explicitly prohibit the use of _testableRoll unless in a test env
    const roll = (typeof Roll === 'undefined' && !!_testableRoll) ?
      _testableRoll.using({mod}) :
      new TestableRoll('2d6 + @mod', {mod});

    roll.roll();
    roll.toMessage();
  }

  /**
   * activateListeners. Finds specific tags within the actor's template and
   * creates listeners for events.
   * @param {HTML} html This actor's computed template
   * @param {object} config The configuration file used as an override
   */
  activateListeners(html, config=WorldsConfiguration) {
    super.activateListeners(html);

    config.attributeConfiguration.forEach((attribute) => {
      const selectorText = BasicCharacterSheet
          .attributeLabelSelectorText(attribute.name);

      html.find(selectorText)
          .click(() => this.clickAttribute(selectorText));
    });
  }
}
