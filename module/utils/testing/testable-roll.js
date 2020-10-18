/**
 * MockedRoll. Used for enabling Foundry Roll objects for testing in
 * Jest. The export of this file checks whether or not the environment
 * is a test environment. if so, the MockedRoll is returned. If not, the
 * regular FoundryVTT Roll is returned instead.
 */
class MockedRoll {
  /**
   * constructor. See https://foundryvtt.com/api/Roll.html for more details
   * @param {string} formula The string formula to parse
   * @param {object} data The data object against which to parse attributes
   * @param {Array} queuedResults Array of numbers that are returned in sequence
   */
  constructor(formula, data, queuedResults) {
    this.formula = formula;
    this.data = data;
    this._numberOfRolls = 0;
    this._queuedResults = queuedResults || [-1];
    this._wasDisplayed = false;
    this._messageData = {};
  }

  /**
   * roll. Sets the result and notes that increments the number of rolls
   * made by this object. Constrains to the last value to avoid overflow.
   */
  roll() {
    this._numberOfRolls += 1;
    const num = Math.min(this._numberOfRolls, this._queuedResults.length);
    this.result = this._queuedResults[num - 1];
  }

  /**
   * toMessage. Notes that the roll message has been displayed.
   * @param {object} messageData The messageData for this message
   */
  toMessage(messageData) {
    this._wasDisplayed = true;
    this._messageData = messageData;
  }

  /**
   * using. Called when injecting a TestableRoll and requesting the data
   * used in the constructor.
   * @param {object} data See constructor.data
   * @return {object} This MockedRoll object
   */
  using(data) {
    this.data = data;
    return this;
  }
}

export const TestableRoll = (typeof Roll === 'undefined') ?
  MockedRoll :
  Roll;
