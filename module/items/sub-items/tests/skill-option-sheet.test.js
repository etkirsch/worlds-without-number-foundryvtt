import SkillOptionSheet from '../skill-option-sheet.js';
import {subItemTemplatePath} from '../../../consts.js';
import {TestableHtml} from '../../../testing/mocks/testable-html.js';

describe('SkillOptionSheet', () => {
  describe('defaultOptions', () => {
    it('has appropriate overrides', () => {
      expect(SkillOptionSheet.defaultOptions.template)
          .toBe(`${subItemTemplatePath}/skill-option-sheet.html`);
    });
  });

  describe('activateListeners', () => {
    it('registers pick input', () => {
      const sheet = new SkillOptionSheet();
      const html = new TestableHtml();
      sheet.activateListeners(html);
      expect(Object.keys(html._activeListeners)).toHaveLength(1);
      expect(SkillOptionSheet
          .PickInputSelectorText in html._activeListeners)
          .toBe(true);
    });
  });

  describe('updatePick', () => {
    it('enqueues an update correctly', () => {
      const sheet = new SkillOptionSheet();
      const updatedValue = 10;
      SkillOptionSheet.updatePick(sheet.item, updatedValue);
      expect(sheet.item._registeredUpdates).toEqual(
          expect.arrayContaining([
            expect.objectContaining({'data.pick': updatedValue}),
          ]),
      );
    });
  });

  describe('handlePickInputChange', () => {
    it('handles calls updatePick', () => {
      const sheet = new SkillOptionSheet();
      const updatedValue = 10;
      const event = {
        currentTarget: {
          value: updatedValue,
        },
      };

      sheet.handlePickInputChange(event);
      expect(sheet.item._registeredUpdates).toEqual(
          expect.arrayContaining([
            expect.objectContaining({'data.pick': updatedValue}),
          ]),
      );
    });
  });
});
