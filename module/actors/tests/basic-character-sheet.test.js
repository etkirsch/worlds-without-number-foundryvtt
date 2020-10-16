import BasicCharacterSheet from '../basic-character-sheet.js';
import {actorTemplatePath} from '../../consts.js';

describe('BasicCharacterSheet', () => {
  describe('defaultOptions', () => {
    it('has appropriate overrides', () => {
      expect(BasicCharacterSheet.defaultOptions.template)
          .toBe(`${actorTemplatePath}/basic-character-sheet.html`);
    });
  });
});
