import {TestableRoll} from '../testable-roll.js';

describe('TestableRoll', () => {
  describe('roll', () => {
    it('defaults to -1', () => {
      const roller = new TestableRoll('1d20');
      roller.roll();
      expect(roller.result).toBe(-1);
    });

    it('returns values as expected', () => {
      const queuedResults = [1, 2, 3];
      const roller = new TestableRoll('1d20', {}, queuedResults);

      queuedResults.forEach((rollResult) => {
        roller.roll();
        expect(roller.result).toBe(rollResult);
      });
    });

    it('constrains to final value after overflow', () => {
      const expectedResults = [1, 2, 2, 2, 2];
      const queuedResults = expectedResults.slice(0, 2);
      const roller = new TestableRoll('1d20', {}, queuedResults);

      queuedResults.forEach((rollResult) => {
        roller.roll();
        expect(roller.result).toBe(rollResult);
      });
    });
  });

  describe('toMessage', () => {
    it('records if was displayed', () => {
      const roller = new TestableRoll('1d20');
      expect(roller._wasDisplayed).toBe(false);
      roller.toMessage();
      expect(roller._wasDisplayed).toBe(true);
    });
  });
});
