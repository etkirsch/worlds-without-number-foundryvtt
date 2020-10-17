import BasicCharacterSheet from '../basic-character-sheet.js';
import {actorTemplatePath} from '../../consts.js';

describe('BasicCharacterSheet', () => {
  const mockedConfig = {
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
});
