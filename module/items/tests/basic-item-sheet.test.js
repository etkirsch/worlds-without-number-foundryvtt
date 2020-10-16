import BasicItemSheet from '../basic-item-sheet.js';
import {itemTemplatePath} from '../../consts.js';

describe('BasicItemSheet', () => {
  describe('defaultOptions', () => {
    it('has appropriate overrides', () => {
      expect(BasicItemSheet.defaultOptions.template)
          .toBe(`${itemTemplatePath}/basic-item-sheet.html`);
    });
  });
});
