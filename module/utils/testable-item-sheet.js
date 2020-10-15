class MockedItemSheet {
  static get defaultOptions () {
    return {
      sheetType: 'mocked'
    }
  }
}

export const TestableItemSheet = (typeof ItemSheet === 'undefined')
  ? MockedItemSheet
  : ItemSheet
