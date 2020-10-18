/**
 * MockedActor. Used for enabling Foundry Actor objects for
 * testing in jest. The export of this file checks whether or
 * not the environment is a test environment. if so, the
 * MockedActor is returned. If not, the regular FoundryVTT
 * Actor is returned instead.
 */
class MockedActor {
  /**
   * The options value of this constructor allows you to pass in any
   * mocked data. Use at your own risk.
   * @param {object} options Optional mocked data options
   */
  constructor(options={}) {
    const mockToken = options.mockToken || {};
    const mockData = options.mockData || {
      '_data': 'mocked',
    };

    this.data = {
      data: mockData,
      token: mockToken,
      flags: options.flags || {},
      img: options.img || 'some-image.svg',
      items: options.items || [],
      name: options.name || 'mock actor',
      permission: options.permission || {
        ownerUserId: 3,
        viewerUserId: 2,
        default: 0,
      },
      sort: options.sort || 100001,
      _id: options._id || 'this-actor-id',
    };
  }
};

export const TestableActor = (typeof Actor === 'undefined') ?
  MockedActor :
  Actor;
