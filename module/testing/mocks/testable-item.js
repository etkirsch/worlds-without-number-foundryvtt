import {TestableBase} from './testable-base.js';

/**
 * MockedItem. Used for enabling Foundry Item objects for
 * testing in jest. The export of this file checks whether or
 * not the environment is a test environment. if so, the
 * MockedItem is returned. If not, the regular FoundryVTT
 * Item is returned instead.
 */
class MockedItem extends TestableBase {
  /**
   * The options value of this constructor allows you to pass in any
   * mocked data. Use at your own risk.
   * @param {object} options Optional mocked data options
   */
  constructor(options={}) {
    super();

    this.name = options.name || 'no name specified';
    this.type = options.type || 'no type specified';

    this.data = {
      data: options.data || {},
    };
    this._registeredUpdates = [{}];
  }

  /**
   * create. Mocked creator for static items
   * @param {object} options
   * @return {object} a new option
   */
  static create(options) {
    const newItem = new MockedItem(options);
    if (this.WorldsGame) {
      this.WorldsGame.game.items[newItem.id] = newItem;
    }
    return newItem;
  }

  /**
   * update.
   * @param {object} options
   */
  update(options) {
    this._registeredUpdates.push(options);
  }
};

export const TestableItem = (typeof Item === 'undefined') ?
  MockedItem :
  Item;
