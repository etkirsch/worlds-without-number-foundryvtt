import {TestableItemSheet} from '../testable-item-sheet.js';

describe('TestableItemSheet', () => {
  describe('defaultOptions', () => {
    it('has mocked sheetType', () => {
      expect(TestableItemSheet.defaultOptions.sheetType)
          .toBe('mocked');
    });
  });

  describe('getData', () => {
    it('has basic mocked data', () => {
      const sheet = new TestableItemSheet();
      const data = sheet.getData();
      expect(data.basic).toBe('mockedGetDataResult');
    });
  });
});
