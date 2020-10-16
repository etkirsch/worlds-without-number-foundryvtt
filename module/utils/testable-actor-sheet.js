/**
 * MockedActorSheet. Used for enabling Foundry ActorSheet objects
 * for testing in jest. The export of this file checks whether or
 * not the environment is a test environment. if so, the
 * MockedActorSheet is returned. If not, the regular FoundryVTT
 * ActorSheet is returned instead.
 */
class MockedActorSheet {
  /**
   * Mocked getDefaultOptions() method. This will be more robust soon
   * @return {object} -- a dummy object
   */
  static get defaultOptions() {
    return {
      sheetType: 'mocked',
    };
  };
}

export const TestableActorSheet = (typeof ActorSheet === 'undefined') ?
  MockedActorSheet :
  ActorSheet;
