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
});
