import {WorldsGame} from '../worlds-game.js';
import {TestableItem} from '../../testing/mocks/testable-item.js';

describe('WorldsGame', () => {
  describe('getItem', () => {
    const _id = 'fake_id';
    const fakeItem = new TestableItem();

    const game = new WorldsGame({
      items: {
        [_id]: fakeItem,
      },
    });
    it('returns the item instance if exists', () => {
      const instance = game.getItem(_id);
      expect(instance).toBe(fakeItem);
    });

    it('returns undefined if does not exist', () => {
      const instance = game.getItem('a different id');
      expect(instance).toBeUndefined();
    });
  });

  describe('IsTestMode', () => {
    it('always shows test mode since this is, in fact, a test', () => {
      expect(WorldsGame.IsTestMode).toBe(true);
    });
  });

  describe('getItemInTest', () => {
    const _id = 'fake_id';
    const fakeItem = new TestableItem();

    const game = new WorldsGame({
      items: {
        [_id]: fakeItem,
      },
    });

    it('does a simple lookup', () => {
      const item = game.getItemInTest(_id);
      expect(item).toBe(fakeItem);
    });
  });
});
