import Skill from '../skill.js';

describe('Skill', () => {
  describe('compare', () => {
    const alpha = new Skill({name: 'alpha'});
    const alphaCapitalized = new Skill({name: 'Alpha'});
    const beta = new Skill({name: 'beta'});

    it('returns -1 if left name comes before right name', () => {
      const comparisonResult = Skill.compare(alpha, beta);
      expect(comparisonResult).toBe(-1);
    });

    it('returns 1 if left name comes after right name', () => {
      const comparisonResult = Skill.compare(beta, alpha);
      expect(comparisonResult).toBe(1);
    });

    it('returns 0 if left name equals  right name', () => {
      const comparisonResult = Skill.compare(alpha, alpha);
      expect(comparisonResult).toBe(0);
    });

    it('ignores case', () => {
      const comparisonResult = Skill.compare(alpha, alphaCapitalized);
      expect(comparisonResult).toBe(0);
    });
  });
});
