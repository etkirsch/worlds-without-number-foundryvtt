import {TestableActorSheet} from '../utils/testing/testable-actor-sheet.js';
import {TestableRoll} from '../utils/testing/testable-roll.js';
import {TestableChatMessage} from '../utils/testing/testable-chat-message.js';
import {actorTemplatePath} from '../consts.js';
import SkillBuilder from './skill-builder.js';
import DialogBuilder from '../utils/builders/dialog-builder.js';
import {WorldsConfiguration} from '../worlds-configuration.js';
import {BasicNoButton, RollButton} from './templates/button-templates.js';
import {rollSkillTemplate} from './templates/roll-skill-template.js';

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
   * skillLabelSelectorText. Creates the label selector text for a
   * skill. This must match up to this Sheet's HTML template.
   * @param {string} skill The requested skill, e.g. 'administer'
   * @return {string} The selector text for the requested skill
   */
  static skillLabelSelectorText(skill) {
    return `.skills-body label.${skill}`;
  }

  /**
   * attributeCheckMessageText. The flavor text displayed when a PC
   * executes an attribute check.
   * @param {string} attribute The requested attribute, e.g. 'strength'
   * @return {string} The flavor text for the ChatMessage
   */
  attributeCheckMessageText(attribute) {
    const {name} = this.actor.data;
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const optionalN = vowels.some((x) => x === attribute[0]) ? 'n': '';

    return `${name} rolls a${optionalN} ${attribute} check...`;
  }

  /**
   * skillCheckMessageText. The flavor text displayed when a PC
   * executes a skill check.
   * @param {string} skill The name of the skill being performed
   * @param {string} attribute The attribute which is used for this check
   * @return {string} The flavor text for the ChatMessage
   */
  skillCheckMessageText(skill, attribute='no-attribute') {
    const {name} = this.actor.data;
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const optionalN = vowels.some((x) => x === attribute[0]) ? 'n': '';

    if (attribute === 'no-attribute') {
      return `${name} rolls to ${skill.name}, taking a -1 penalty for having ` +
        `no relevant attribute modifiers.`;
    }

    return `${name} rolls to ${skill.name} using a${optionalN} ` +
        `${attribute} check...`;
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
   * @param {Object} _testableRoll Testing only. See mocked-roll.js
   */
  clickAttribute(attributeType, _testableRoll) {
    const {data} = this.actor.data;
    const mod = this.actor.constructor.attributeModifier(data[attributeType]);

    // Explicitly prohibit the use of _testableRoll unless in a test env
    const roll = (typeof Roll === 'undefined' && !!_testableRoll) ?
      _testableRoll.using({mod}) :
      new TestableRoll('2d6 + @mod', {mod});

    roll.roll();
    roll.toMessage({
      flavor: this.attributeCheckMessageText(attributeType),
      speaker: TestableChatMessage.getSpeaker({actor: this.actor}),
    });
  }

  /**
   * performSkillCheck. Takes a skill and attribute (which can also be
   * 'no-attribute' for none that are relevant) and performs a skill
   * check with those modifiers.
   * @param {string} skillKey The key of the skill being used
   * @param {string} attribute The Key of the attribute being used
   * @param {number} target The target value for this check
   * @param {Object} _testableRoll Testing only. See mocked-roll.js
   */
  performSkillCheck({skillKey, attribute, target, _testableRoll}) {
    const {data} = this.actor.data;
    const skillModifier = data[skillKey];
    const attributeModifier = (attribute in data) ?
      this.actor.constructor.attributeModifier(data[attribute]) :
      -1;

    const rollData = {
      attrMod: attributeModifier,
      skillMod: skillModifier,
    };

    // Explicitly prohibit the use of _testableRoll unless in a test env
    const roll = (typeof Roll === 'undefined' && !!_testableRoll) ?
      _testableRoll.using(rollData) :
      new TestableRoll('2d6 + @skillMod + @attrMod', rollData);

    roll.roll();
    roll.toMessage({
      flavor: this.skillCheckMessageText(skillKey, attribute),
      speaker: TestableChatMessage.getSpeaker({actor: this.actor}),
    });
  }

  /**
   * clickSkill. Registers a skill click and then creates a prompt to roll
   * a check of this type.
   * @param {Object} skill The specific Skill object
   * @param {Object} _testableRoll Testing only. See mocked-roll.js
   * @param {Object} _dialogBuilder Testing only. See dialog-builder.js
   * @return {Object} The dialog returned for testing purposes only
   */
  clickSkill(skill, _testableRoll, _dialogBuilder) {
    const builder = _dialogBuilder || new DialogBuilder();

    const rollCheckButton = {
      ...RollButton,
      key: 'roll',
      callback: (html) => {
        const attribute = html.find('[name="attribute"]').val();
        this.performSkillCheck({skillKey: skill.key, attribute, _testableRoll});
      },
    };

    const dialog = builder
        .withTitle(`Perform ${skill.name} check`)
        .withContent(rollSkillTemplate(skill))
        .withButton(rollCheckButton)
        .withButton(BasicNoButton)
        .build();

    dialog.render(true);
    return dialog;
  }

  /**
   * activateAttributeListeners. Submethod for activateListeners to register
   * all listeners for Attribute Page Elements.
   * @param {HTML} html This actor's computed template
   * @param {object} config <optional> The configuration file used as an
   * override
   */
  activateAttributeListeners(html, config) {
    config.attributeConfiguration.forEach((attribute) => {
      const selectorText = BasicCharacterSheet
          .attributeLabelSelectorText(attribute.name);

      html.find(selectorText)
          .click(() => this.clickAttribute(attribute.name));
    });
  }

  /**
   * activateSkillListeners. Submethod for activateListeners to register all
   * listeners for Skill Page Elements.
   * @param {HTML} html This actor's computed template
   * @param {object} config <optional> The configuration file used as an
   * override
   */
  activateSkillListeners(html, config) {
    const skills = this.getSkills(config);

    skills.forEach((skill) => {
      const selectorText = BasicCharacterSheet
          .skillLabelSelectorText(skill.key);

      html.find(selectorText)
          .click(() => this.clickSkill(skill));
    });
  }

  /**
   * activateListeners. Finds specific tags within the actor's template and
   * creates listeners for events.
   * @param {HTML} html This actor's computed template
   * @param {object} config <optional> The configuration file used as an
   * override
   */
  activateListeners(html, config=WorldsConfiguration) {
    super.activateListeners(html);
    this.activateAttributeListeners(html, config);
    this.activateSkillListeners(html, config);
  }
}
