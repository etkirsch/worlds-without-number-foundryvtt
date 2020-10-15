import { TestableItemSheet } from  '../testable-item-sheet.js'

describe('TestableItemSheet', () => {
  describe('defaultOptions', () => {
    it('has mocked sheetType', () => {
      expect(TestableItemSheet.defaultOptions.sheetType)
        .toBe('mocked')
    })
  })
})
