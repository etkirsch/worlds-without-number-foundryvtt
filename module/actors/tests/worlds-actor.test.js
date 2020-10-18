import WorldsActor from '../worlds-actor.js';

describe('WorldsActor', () => {
  describe('attributeModifier', () => {
    it('handles all cases appropriately', () => {
      const expectedResults = [-2, -2, -2, -2, -1, -1, -1, -1,
        0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2];

      expectedResults.forEach((expectedResult, rawScore) => {
        expect(WorldsActor.attributeModifier(rawScore))
            .toBe(expectedResult);
      });
    });
  });

  describe('getTemplateModifier', () => {
    it('returns properly formatted negative string', () => {
      let result = WorldsActor.getTemplateModifier(-1);
      expect(result).toBe('-1');

      result = WorldsActor.getTemplateModifier(-10);
      expect(result).toBe('-10');
    });

    it('returns properly formatted positive string', () => {
      let result = WorldsActor.getTemplateModifier(1);
      expect(result).toBe('+1');

      result = WorldsActor.getTemplateModifier(10);
      expect(result).toBe('+10');
    });

    it('returns ZeroTemplateText when zero', () => {
      const result = WorldsActor.getTemplateModifier(0);
      expect(result).toBe(WorldsActor.ZeroTemplateText);
    });
  });
});
