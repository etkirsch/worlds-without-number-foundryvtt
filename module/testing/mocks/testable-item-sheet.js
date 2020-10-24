import {TestableBase} from './testable-base.js';
import WorldsItem from '../../items/worlds-item.js';

/**
 * MockedItemSheet. Used for enabling Foundry ItemSheet objects
 * for testing in jest. The export of this file checks whether or
 * not the environment is a test environment. if so, the
 * MockedItemSheet is returned. If not, the regular FoundryVTT
 * ItemSheet is returned instead.
 */
class MockedItemSheet extends TestableBase {
  /**
   * The options value of this constructor allows you to pass in any
   * mocked data. Use at your own risk.
   * @param {object} options Optional mocked data options
   */
  constructor(options={}) {
    super();
    const _itemOptions = options.itemOptions;
    this.item = options.item || new WorldsItem(_itemOptions);
  }

  /**
   * Mocked getDefaultOptions() method. This will be more robust soon
   * @return {object} -- a dummy object
   */
  static get defaultOptions() {
    return {
      sheetType: 'mocked',
    };
  }

  /**
   * Mocked getData() method. This will be more robust soon
   * @return {object} -- a dummy object
   */
  getData() {
    return {
      basic: 'mockedGetDataResult',
    };
  }

  /**
   * Mocked _onSubmit() method. This will be more robust soon
   * @param {object} event As ItemSheet._onSubmit
   * @param {object} options As ItemSheet._onSubmit
   */
  async _onSubmit(event, options={}) {
  }

  /**
   * activateListeners. Does nothing here.
   * @param {HTML} html This actor's computed template
   */
  activateListeners(html) {}
}

export const TestableItemSheet = (typeof ItemSheet === 'undefined') ?
  MockedItemSheet :
  ItemSheet;
