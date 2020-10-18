import ItemModifierSheet from '../item-modifier-sheet.js';
import {itemTemplatePath} from '../../consts.js';

describe('ItemModifierSheet', () => {
  describe('defaultOptions', () => {
    it('has appropriate overrides', () => {
      expect(ItemModifierSheet.defaultOptions.template)
          .toBe(`${itemTemplatePath}/item-modifier-sheet.html`);
    });
  });
});
