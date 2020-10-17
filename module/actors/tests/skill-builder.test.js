import SkillBuilder from '../skill-builder.js';
import Skill from '../skill.js';

describe('SkillBuilder', () => {
  describe('constructor validation', () => {
    it('raises exception with bad config input', () => {
      expect(() => {
        const builder = new SkillBuilder({});
        builder.buildSkill('anyKey');
      }).toThrowError(SkillBuilder.ImproperConfigFormat);
    });
  });

  describe('buildSkill', () => {
    it('raises exception with No Config when deleted', () => {
      expect(() => {
        const builder = new SkillBuilder({skillConfiguration: {}});
        delete builder.config;
        builder.buildSkill('anyKey');
      }).toThrowError(SkillBuilder.NoConfigErrorText);
    });

    it('raises exception with No Config when deleted', () => {
      const key = 'anyKey';
      expect(() => {
        const config = {
          skillConfiguration: {
            'aSkill': {},
          },
        };
        const builder = new SkillBuilder(config);
        builder.buildSkill(key);
      }).toThrowError(SkillBuilder.noMatchingSkillKeyErrorText(key));
    });

    it('returns a built key when validation passes', () => {
      const key = 'anyKey';
      const skillName = 'skill name';
      const config = {
        skillConfiguration: {
          [key]: {
            name: skillName,
          },
        },
      };
      const builder = new SkillBuilder(config);
      const builtSkill = builder.buildSkill(key);
      expect(builtSkill).toBeInstanceOf(Skill);
      expect(builtSkill.name).toBe(skillName);
    });
  });

  describe('buildAll', () => {
    it('returns an empty list when no skills are in configuration', () => {
      const config = {
        skillConfiguration: {},
      };

      const builder = new SkillBuilder(config);
      const skills = builder.buildAll();
      expect(skills.length).toBe(0);
    });

    // Note: If this is flaky for you, it is highly likely you have some issue
    // with the Skill.compare method.
    it('returns a list of alphabetized skills from configuration', () => {
      const config = {
        skillConfiguration: {
          'beta': {
            name: 'beta',
          },
          'alpha': {
            name: 'alpha',
          },
        },
      };

      const builder = new SkillBuilder(config);
      const skills = builder.buildAll();
      expect(skills.length).toBe(2);
      expect(skills[0].name).toBe('alpha');
      expect(skills[1].name).toBe('beta');
    });
  });
});
