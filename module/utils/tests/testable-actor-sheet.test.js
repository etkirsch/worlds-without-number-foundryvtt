import { TestableActorSheet } from  '../testable-actor-sheet.js'

describe('TestableActorSheet', () => {
  describe('defaultOptions', () => {
    it('has mocked sheetType', () => {
      expect(TestableActorSheet.defaultOptions.sheetType)
        .toBe('mocked')
    })
  })
})
