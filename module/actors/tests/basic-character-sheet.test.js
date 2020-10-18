import BasicCharacterSheet from '../basic-character-sheet.js';
import {TestableRoll} from '../../utils/testing/testable-roll.js';
import {TestableHtml} from '../../utils/testing/testable-html.js';
import {actorTemplatePath} from '../../consts.js';

describe('BasicCharacterSheet', () => {
  const mockedConfig = {
    attributeConfiguration: [
      {name: 'strength'},
      {name: 'dexterity'},
    ],
    skillConfiguration: {
      'beta': {
        name: 'beta',
      },
      'alpha': {
        name: 'alpha',
      },
    },
  };

  describe('defaultOptions', () => {
    it('has appropriate overrides', () => {
      expect(BasicCharacterSheet.defaultOptions.template)
          .toBe(`${actorTemplatePath}/basic-character-sheet.html`);
    });
  });

  describe('getSkills', () => {
    it('returns a list of skills in alphabetical order', () => {
      const sheet = new BasicCharacterSheet();
      const skills = sheet.getSkills(mockedConfig);

      expect(skills.length).toBe(2);
      expect(skills[0].name).toBe('alpha');
      expect(skills[1].name).toBe('beta');
    });
  });

  describe('attributeCheckMessageText', () => {
    it('returns the correct text', () => {
      const sheet = new BasicCharacterSheet();
      sheet.actor.data.name = 'Baudin';
      const text = sheet.attributeCheckMessageText('strength');
      expect(text).toBe('Baudin rolls a strength check...');
    });

    it('handles vowels appropriately', () => {
      const sheet = new BasicCharacterSheet();
      sheet.actor.data.name = 'Baudin';
      const text = sheet.attributeCheckMessageText('intelligence');
      expect(text).toBe('Baudin rolls an intelligence check...');
    });
  });

  describe('getData', () => {
    it('contains all relevant sheet data keys', () => {
      const sheet = new BasicCharacterSheet();
      const data = sheet.getData({config: mockedConfig});

      expect(data.foundryData).toBeDefined();
      expect(data.actor).toBeDefined();
      expect(Object.keys(data)).toHaveLength(2);
    });

    it('contains skill data', () => {
      const sheet = new BasicCharacterSheet();
      const data = sheet.getData({config: mockedConfig});

      expect(data.actor).toBeDefined();
      expect(data.actor.skills).toBeDefined();
      expect(data.actor.skills).toHaveLength(2);
      expect(data.actor.skills[0].name).toBe('alpha');
      expect(data.actor.skills[1].name).toBe('beta');
    });
  });

  describe('getTemplateAttributeModifiers', () => {
    it('returns a list of properly formatted attribute modifiers', () => {
      const sheet = new BasicCharacterSheet();
      sheet.actor.data.strength = 14;
      sheet.actor.data.dexterity = 10;
      const modifiers = sheet.getTemplateAttributeModifiers(mockedConfig);

      expect(modifiers).toHaveLength(2);
      expect(modifiers[0]).toBe('+1');
      expect(modifiers[1]).toBe('--');
    });
  });

  describe('clickAttribute', () => {
    const sheet = new BasicCharacterSheet();
    sheet.actor.data.data.strength = 14;
    sheet.actor.data.data.dexterity = 6;
    sheet.actor.data.name = 'clickAttributeTester';

    it('gets the correct values for rolling', () => {
      const _testableRoll = new TestableRoll('2d6');
      sheet.clickAttribute('strength', _testableRoll);
      expect(_testableRoll.data.mod).toBe(1);

      sheet.clickAttribute('dexterity', _testableRoll);
      expect(_testableRoll.data.mod).toBe(-1);
    });

    it('does the roll, then displays a message', () => {
      const _testableRoll = new TestableRoll('2d6');
      sheet.clickAttribute('strength', _testableRoll);
      expect(_testableRoll._numberOfRolls).toBe(1);
      expect(_testableRoll._wasDisplayed).toBe(true);
    });

    it('formats the message appropriately', () => {
      const _testableRoll = new TestableRoll('2d6');
      sheet.clickAttribute('strength', _testableRoll);
      expect(_testableRoll._messageData.flavor)
          .toBe(sheet.attributeCheckMessageText('strength'));
      expect(_testableRoll._messageData.speaker.data.actor).toBe(sheet.actor);
    });
  });

  describe('activateListeners', () => {
    it('registers all attribute labels in .attributes-body', () => {
      const sheet = new BasicCharacterSheet();
      const html = new TestableHtml();
      sheet.activateListeners(html, mockedConfig);
      expect(Object.keys(html._activeListeners)).toHaveLength(2);
      expect(BasicCharacterSheet
          .attributeLabelSelectorText('strength') in html._activeListeners)
          .toBe(true);
      expect(BasicCharacterSheet
          .attributeLabelSelectorText('dexterity') in html._activeListeners)
          .toBe(true);
    });
  });
});
