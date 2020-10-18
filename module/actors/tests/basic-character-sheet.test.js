import BasicCharacterSheet from '../basic-character-sheet.js';
import DialogBuilder from '../../utils/builders/dialog-builder.js';
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
      'administer': {
        name: 'Administer',
        key: 'administer',
        relevantAttributes: [
          'strength',
        ],
      },
      'heal': {
        name: 'heal',
        key: 'heal',
        relevantAttributes: [
          'strength',
          'dexterity',
        ],
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
      expect(skills[0].key).toBe('administer');
      expect(skills[1].key).toBe('heal');
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

  describe('skillCheckMessageText', () => {
    it('returns the correct text', () => {
      const sheet = new BasicCharacterSheet();
      sheet.actor.data.name = 'Baudin';
      const skill = {name: 'heal'};
      const attribute = 'strength';
      const text = sheet.skillCheckMessageText(skill, attribute);
      expect(text).toBe('Baudin rolls to heal using a strength check...');
    });

    it('handles vowels appropriately', () => {
      const sheet = new BasicCharacterSheet();
      sheet.actor.data.name = 'Baudin';
      const skill = {name: 'heal'};
      const attribute = 'intelligence';
      const text = sheet.skillCheckMessageText(skill, attribute);
      expect(text).toBe('Baudin rolls to heal using an intelligence check...');
    });

    it('handles no-attribute appropriately', () => {
      const sheet = new BasicCharacterSheet();
      sheet.actor.data.name = 'Baudin';
      const skill = {name: 'heal'};
      const attribute = 'no-attribute';
      const text = sheet.skillCheckMessageText(skill, attribute);
      expect(text).toBe('Baudin rolls to heal, taking a -1 penalty for ' +
        'having no relevant attribute modifiers.');
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
      expect(data.actor.skills[0].key).toBe('administer');
      expect(data.actor.skills[1].key).toBe('heal');
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

  describe('performSkillCheck', () => {
    const sheet = new BasicCharacterSheet();
    sheet.actor.data.data.strength = 14;
    sheet.actor.data.data.dexterity = 6;
    sheet.actor.data.data.administer = 2;
    sheet.actor.data.name = 'performSkillCheckTester';

    it('gets the correct values for rolling with attributes', () => {
      const _testableRoll = new TestableRoll('2d6');
      const skill = mockedConfig.skillConfiguration['administer'];
      const attribute = 'strength';
      sheet.performSkillCheck({skill, attribute, _testableRoll});
      expect(_testableRoll.data.attrMod).toBe(1);
      expect(_testableRoll.data.skillMod).toBe(2);
    });

    it('gets the correct values for rolling without attributes', () => {
      const _testableRoll = new TestableRoll('2d6');
      const skill = mockedConfig.skillConfiguration['administer'];
      const attribute = '';
      sheet.performSkillCheck({skill, attribute, _testableRoll});
      expect(_testableRoll.data.attrMod).toBe(-1);
      expect(_testableRoll.data.skillMod).toBe(2);
    });

    it('does the roll, then displays a message', () => {
      const _testableRoll = new TestableRoll('2d6');
      const skill = mockedConfig.skillConfiguration['administer'];
      const attribute = 'strength';
      sheet.performSkillCheck({skill, attribute, _testableRoll});
      expect(_testableRoll._numberOfRolls).toBe(1);
      expect(_testableRoll._wasDisplayed).toBe(true);
    });

    it('formats the message with attributes appropriately', () => {
      const _testableRoll = new TestableRoll('2d6');
      const skill = mockedConfig.skillConfiguration['administer'];
      const attribute = 'strength';
      sheet.performSkillCheck({skill, attribute, _testableRoll});
      expect(_testableRoll._messageData.flavor)
          .toBe(sheet.skillCheckMessageText(skill, attribute));
      expect(_testableRoll._messageData.speaker.data.actor).toBe(sheet.actor);
    });

    it('formats the message without attributes appropriately', () => {
      const _testableRoll = new TestableRoll('2d6');
      const skill = mockedConfig.skillConfiguration['administer'];
      sheet.performSkillCheck({skill, _testableRoll});
      expect(_testableRoll._messageData.flavor)
          .toBe(sheet.skillCheckMessageText(skill));
      expect(_testableRoll._messageData.speaker.data.actor).toBe(sheet.actor);
    });
  });

  describe('clickSkill', () => {
    it('builds a dialog for the skill appropriately', () => {
      const sheet = new BasicCharacterSheet();
      const _dialogBuilder = new DialogBuilder();
      const skill = mockedConfig.skillConfiguration['administer'];

      sheet.clickSkill(skill, null, _dialogBuilder);
      expect(_dialogBuilder.data.title).toBe('Perform Administer check');
      expect(Object.keys(_dialogBuilder.data.buttons)).toHaveLength(2);
      expect(_dialogBuilder.data.default).toBe('roll');
    });

    it('renders a dialog', () => {
      const sheet = new BasicCharacterSheet();
      const _dialogBuilder = new DialogBuilder();
      const skill = mockedConfig.skillConfiguration['administer'];

      const dialog = sheet.clickSkill(skill, null, _dialogBuilder);
      expect(dialog._wasDisplayed).toBe(true);
    });

    it('creates an actionable dialog', () => {
      const sheet = new BasicCharacterSheet();
      sheet.performSkillCheck = jest.fn();
      const html = new TestableHtml();
      const _dialogBuilder = new DialogBuilder();
      const skill = mockedConfig.skillConfiguration['administer'];

      const dialog = sheet.clickSkill(skill, null, _dialogBuilder);
      dialog.callButton('roll', html);
      expect(sheet.performSkillCheck).toHaveBeenCalled();
    });
  });

  describe('activateAttributeListeners', () => {
    it('registers all attribute labels in .attributes-body', () => {
      const sheet = new BasicCharacterSheet();
      const html = new TestableHtml();
      sheet.activateListeners(html, mockedConfig);
      expect(Object.keys(html._activeListeners)).toHaveLength(4);
      expect(BasicCharacterSheet
          .attributeLabelSelectorText('strength') in html._activeListeners)
          .toBe(true);
      expect(BasicCharacterSheet
          .attributeLabelSelectorText('dexterity') in html._activeListeners)
          .toBe(true);
    });

    it('registers a listener that calls clickAttribute', () => {
      const sheet = new BasicCharacterSheet();
      const html = new TestableHtml();
      const selector = BasicCharacterSheet
          .attributeLabelSelectorText('strength');

      sheet.clickAttribute = jest.fn();
      sheet.activateAttributeListeners(html, mockedConfig);

      html.find(selector)
          .mimicClickEvent(html);

      expect(sheet.clickAttribute).toHaveBeenCalled();
    });
  });

  describe('activateSkillListeners', () => {
    it('registers all skill labels in .skills-body', () => {
      const sheet = new BasicCharacterSheet();
      const html = new TestableHtml();
      sheet.activateSkillListeners(html, mockedConfig);
      expect(Object.keys(html._activeListeners)).toHaveLength(2);
      expect(BasicCharacterSheet
          .skillLabelSelectorText('administer') in html._activeListeners)
          .toBe(true);
      expect(BasicCharacterSheet
          .skillLabelSelectorText('heal') in html._activeListeners)
          .toBe(true);
    });

    it('registers a listener that calls clickSkill', () => {
      const sheet = new BasicCharacterSheet();
      const html = new TestableHtml();
      const selector = BasicCharacterSheet.skillLabelSelectorText('administer');

      sheet.clickSkill = jest.fn();
      sheet.activateSkillListeners(html, mockedConfig);

      html.find(selector)
          .mimicClickEvent(html);

      expect(sheet.clickSkill).toHaveBeenCalled();
    });
  });

  describe('activateListeners', () => {
    it('registers all attribute labels in .attributes-body', () => {
      const sheet = new BasicCharacterSheet();
      const html = new TestableHtml();
      sheet.activateListeners(html, mockedConfig);
      expect(Object.keys(html._activeListeners)).toHaveLength(4);
      expect(BasicCharacterSheet
          .attributeLabelSelectorText('strength') in html._activeListeners)
          .toBe(true);
      expect(BasicCharacterSheet
          .attributeLabelSelectorText('dexterity') in html._activeListeners)
          .toBe(true);
    });

    it('registers all skill labels in .skills-body', () => {
      const sheet = new BasicCharacterSheet();
      const html = new TestableHtml();
      sheet.activateListeners(html, mockedConfig);
      expect(Object.keys(html._activeListeners)).toHaveLength(4);
      expect(BasicCharacterSheet
          .skillLabelSelectorText('administer') in html._activeListeners)
          .toBe(true);
      expect(BasicCharacterSheet
          .skillLabelSelectorText('heal') in html._activeListeners)
          .toBe(true);
    });
  });
});
