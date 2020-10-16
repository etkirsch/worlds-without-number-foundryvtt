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
});
