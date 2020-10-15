class MockedItemSheet {
  static get defaultOptions () {
    return {
      sheetType: 'mocked'
    }
  }

  getData () {
    return {
      basic: 'mockedGetDataResult'
    }
  }

  async _onSubmit (event, options={}) {
  }
}

export const TestableItemSheet = (typeof ItemSheet === 'undefined')
  ? MockedItemSheet
  : ItemSheet
