const defaultMockData = {
  items: {
  },
  actors: {
  },
};

/**
 * Worlds game.
 */
export class WorldsGame {
  /**
   * isTestMode
   * @return {bool} true if called by jest
   */
  static get IsTestMode() {
    return typeof game === 'undefined';
  }

  /**
   * resetTo. Resets the game state to a given configuration. Used in
   * testing, mainly.
   * @param {Object} configuration Used to populate items and actors
   */
  resetTo(configuration) {
    this.game = {...configuration};
  }

  /**
   * constructor.
   * @param {Object} mockedData Used to populate items and actors
   */
  constructor(mockedData=defaultMockData) {
    this.game = this.constructor.IsTestMode ?
      {...mockedData} :
      game;
  }

  /**
   * getItemInTest special method to mimic entitycollection.get
   * @param {string} id The identifier of the object
   * @return {object?} The object result or null if it does not exist
   */
  getItemInTest(id) {
    return this.game.items[id];
  }

  /**
   * getItem. Attempts to find an item given a specific identifier.
   * returns null if the object does not exist.
   * @param {string} id The identifier of the object
   * @return {object?} The object result or null if it does not exist
   */
  getItem(id) {
    return (this.constructor.IsTestMode) ?
      this.game.items[id] :
      this.game.items.get(id);
  }
};
