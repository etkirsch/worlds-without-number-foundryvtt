/**
 * MockedActor. Used for enabling Foundry Actor objects for
 * testing in jest. The export of this file checks whether or
 * not the environment is a test environment. if so, the
 * MockedActor is returned. If not, the regular FoundryVTT
 * Actor is returned instead.
 */
class MockedActor {
};

export const TestableActor = (typeof Actor === 'undefined') ?
  MockedActor :
  Actor;
