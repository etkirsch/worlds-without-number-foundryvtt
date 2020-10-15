class MockedActorSheet {
  static get defaultOptions () {
    return {
      sheetType: 'mocked'
    }
  }
}

export const TestableActorSheet = (typeof Actor === 'undefined')
  ? MockedActorSheet
  : ActorSheet
