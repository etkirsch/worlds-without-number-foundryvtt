/**
 * MockedItemSheet. Used for enabling Foundry ItemSheet objects
 * for testing in jest. The export of this file checks whether or
 * not the environment is a test environment. if so, the
 * MockedItemSheet is returned. If not, the regular FoundryVTT
 * ItemSheet is returned instead.
 */
class MockedItemSheet {
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
}

export const TestableItemSheet = (typeof ItemSheet === 'undefined') ?
  MockedItemSheet :
  ItemSheet;
