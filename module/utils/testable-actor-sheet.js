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

  /**
   * getData. Returns a mock of getData() for an ActorSheet. Should be
   * roughly identical in shape to that returned by a basic Actor Entity
   * in Foundry.
   * @return {Object} The sheet's mocked data
   */
  getData() {
    const mockOptions = {
      baseApplication: 'ActorSheet',
      classes: 'character',
      closeOnSubmit: false,
      dragDrop: [],
      editable: true,
      height: 720,
      id: '',
      left: null,
      minimizable: true,
      popOut: true,
      resizable: true,
      scrollY: [],
      submitOnChange: true,
      submitOnClose: true,
      tabs: [],
      template: 'systems/testable-system/testable-actor-sheet.html',
      title: '',
      top: null,
      width: 800,
    };

    const mockData = {
      '_data': 'mocked',
    };

    const mockToken = {};

    const mockActor = {
      data: mockData,
      flags: {},
      img: 'some-image.svg',
      items: [],
      name: 'mock actor',
      permission: {
        ownerUserId: 3,
        viewerUserId: 2,
        default: 0,
      },
      sort: 100001,
      token: mockToken,
      _id: 'this-actor-id',
    };

    return {
      actor: mockActor,
      cssClass: 'editable',
      data: {},
      editable: true,
      entity: mockActor,
      items: [],
      limited: false,
      options: mockOptions,
      owner: true,
    };
  }
}

export const TestableActorSheet = (typeof ActorSheet === 'undefined') ?
  MockedActorSheet :
  ActorSheet;
