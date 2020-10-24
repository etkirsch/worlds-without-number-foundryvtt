import {TestableItem} from '../testing/mocks/testable-item.js';

/**
 * WorldsItem. The main Worlds Without Number actor class.
 */
export default class WorldsItem extends TestableItem {
  /**
   * registerGame. Sets the static value of WorldsGame.
   * @param {Object} game Either the Foundry game or a
   * WorldsGame mock
   */
  static registerGame(game) {
    WorldsItem.WorldsGame = game;
  }

  /** */
  initialize() {
    super.initialize();
  }

  /**
   * get. Gets an Item by Id.
   * @param {string} id Requested object id
   * @return {object} WorldsItem (if it exists)
   */
  static get(id) {
    return this.WorldsGame.getItem(id);
  }
}
