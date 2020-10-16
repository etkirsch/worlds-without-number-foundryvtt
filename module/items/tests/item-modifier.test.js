import ItemModifier from '../item-modifier.js';
import {itemTemplatePath} from '../../consts.js';

describe('ItemModifier', () => {
  describe('defaultOptions', () => {
    it('has appropriate overrides', () => {
      expect(ItemModifier.defaultOptions.template)
          .toBe(`${itemTemplatePath}/item-modifier.html`);
    });
  });
});
